"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const web3storage_1 = require("../integrations/web3storage");
const biconomy_1 = require("../integrations/biconomy");
const ethers_1 = require("ethers");
const network_utils_1 = require("../utils/network.utils");
class CreateArmourService {
    constructor() {
        this.getFiles = (cid) => __awaiter(this, void 0, void 0, function* () {
            const files = yield (0, web3storage_1.retrieveFiles)(cid);
            if (files.length === 0) {
                throw new Error("No files found.");
            }
            const creatorDetails = {
                nameOfWork: "",
                creatorId: "",
                altMedium: "",
                medium: "",
                license: "",
                timeStamp: "",
                image: "",
            };
            yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                if (file.name.includes(".jpeg") || file.name.includes(".png")) {
                    creatorDetails.image = `https://ipfs.io/ipfs/${file.cid}`;
                }
                else {
                    const response = yield axios_1.default.get(`https://${file.cid}.ipfs.w3s.link/`);
                    creatorDetails[file.name] = response.data;
                }
            })));
            return creatorDetails;
        });
        this.getTimeStampHash = (cid, chainname) => __awaiter(this, void 0, void 0, function* () {
            const { chainId, contractAddress } = (0, network_utils_1.getNetworkConfig)(chainname);
            const nftInterface = new ethers_1.ethers.utils.Interface([
                "function createTimeStamp(string cid)",
            ]);
            const data = nftInterface.encodeFunctionData("createTimeStamp", [cid]);
            const transaction = {
                to: contractAddress,
                data: data
            };
            const partialUserOp = yield (0, biconomy_1.getPartialUserOp)(transaction, chainId);
            return yield (0, biconomy_1.executeUserOp)(partialUserOp);
        });
    }
}
exports.default = new CreateArmourService();
//Way Forward
//Deploy Contract
//Send a file and DData to create a CID
//How to upload more than one file from the same endpoint
//if I have a html form that has multiple file upload fields
//how does HTML differentiate them when sending to  a backend
