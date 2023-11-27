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
const validation_utils_1 = require("../utils/validation.utils");
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
            var _a;
            const files = request.files;
            const artworkDetails = yield validation_utils_1.uploadArtWorkSchema.validate(request.body);
            let { chainName } = request.query;
            chainName !== null && chainName !== void 0 ? chainName : (chainName = constants_utils_1.DEFAULT_CHAIN);
            if (!files || files.length < constants_utils_1.ONE || !chainName) {
                return response.status(constants_utils_1.BAD_REQUEST).send({ message: "Invalid Parameters Sent" });
            }
            try {
                const filesArray = files.map(multerFile => {
                    const { originalname, mimetype, buffer } = multerFile;
                    return new File([buffer], originalname, { type: mimetype });
                });
                filesArray.concat(new File([JSON.stringify(artworkDetails)], "artDescription", { type: "text/plain;charset=utf-8", lastModified: Date.now() }));
                const cid = yield (0, web3storage_1.storeFiles)(filesArray);
                const hash = yield creatorarmor_services_1.default.getTimeStampHash(cid, chainName);
                return response.status(constants_utils_1.OK).send({
                    message: "Success",
                    Data: { transactionHash: hash }
                });
            }
            catch (error) {
                return response.status((_a = error === null || error === void 0 ? void 0 : error.status) !== null && _a !== void 0 ? _a : constants_utils_1.INTERNAL_SERVER_ERROR).send({ message: `An Error Ocurred: \n${error.message}` });
            }
        });
    }
}
exports.default = new CreatorArmourController();
