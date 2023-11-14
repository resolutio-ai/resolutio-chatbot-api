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
const constant_utils_1 = require("../../../resources/utils/constant.utils");
const web3storage_1 = require("../integrations/web3storage");
const creatorarmour_services_1 = __importDefault(require("../service/creatorarmour.services"));
class CreatorArmourController {
    constructor() {
        this.getCreatedWork = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { cid, chainName } = request.query;
            if (!cid || !chainName) {
                response.status(constant_utils_1.BAD_REQUEST).send({});
            }
            let work = null;
            try {
                work = yield creatorarmour_services_1.default.getFiles(cid, chainName);
            }
            catch (error) {
                return response.status(constant_utils_1.INTERNAL_SERVER_ERROR).
                    send({
                    message: `An Error Ocurred: \n${error.message}`
                });
            }
            return response.status(constant_utils_1.OK).send({ message: "Success", data: work });
        });
        this.createTimeStamp = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { files, chainName } = request.body;
            if (!files || files.length < constant_utils_1.ONE || !chainName) {
                return response.status(constant_utils_1.BAD_REQUEST).send({ message: "Invalid Parameters Sent" });
            }
            let cid;
            let hash;
            try {
                cid = yield (0, web3storage_1.storeFiles)(files);
                hash = yield creatorarmour_services_1.default.getTimeStampHash(cid, chainName);
            }
            catch (error) {
                return response.status(constant_utils_1.INTERNAL_SERVER_ERROR).send({ message: `An Error Ocurred: \n${error.message}` });
            }
            return response.status(constant_utils_1.OK).send({
                message: "Success",
                Data: { transactionHash: hash }
            });
        });
    }
}
exports.default = new CreatorArmourController();
