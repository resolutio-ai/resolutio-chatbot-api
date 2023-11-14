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
const constants_utils_1 = require("../utils/constants.utils");
const web3storage_1 = require("../integrations/web3storage");
const creatorarmor_services_1 = __importDefault(require("../services/creatorarmor.services"));
class CreatorArmourController {
    constructor() {
        this.getCreatedWork = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { cid, chainName } = request.query;
            if (!cid || !chainName) {
                response.status(constants_utils_1.BAD_REQUEST).send({});
            }
            let work = null;
            try {
                work = yield creatorarmor_services_1.default.getFiles(cid);
            }
            catch (error) {
                return response.status(constants_utils_1.INTERNAL_SERVER_ERROR).
                    send({
                    message: `An Error Ocurred: \n${error.message}`
                });
            }
            return response.status(constants_utils_1.OK).send({ message: "Success", data: work });
        });
        this.createTimeStamp = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const files = request.files;
            const { chainName } = request.query;
            if (!files || files.length < constants_utils_1.ONE || !chainName) {
                return response.status(constants_utils_1.BAD_REQUEST).send({ message: "Invalid Parameters Sent" });
            }
            let cid;
            let hash;
            try {
                const filesArray = files.map(multerFile => {
                    const { originalname, mimetype, buffer } = multerFile;
                    return new File([buffer], originalname, { type: mimetype });
                });
                cid = yield (0, web3storage_1.storeFiles)(filesArray);
                hash = yield creatorarmor_services_1.default.getTimeStampHash(cid, chainName);
            }
            catch (error) {
                return response.status(constants_utils_1.INTERNAL_SERVER_ERROR).send({ message: `An Error Ocurred: \n${error.message}` });
            }
            return response.status(constants_utils_1.OK).send({
                message: "Success",
                Data: { transactionHash: hash }
            });
        });
    }
}
exports.default = new CreatorArmourController();
