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
const user_model_1 = require("../models/user.model");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const constants_utils_1 = require("../utils/constants.utils");
class AuthController {
    authenticate(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { DIDToken } = request.body;
            if (!DIDToken) {
                return response.status(constants_utils_1.UNAUTHORIZED).send({ message: "Invalid Token" });
            }
            try {
                const { email, publicAddress } = yield auth_service_1.default.validateDIDToken(DIDToken);
            }
            catch (error) {
                return response.status(constants_utils_1.BAD_REQUEST).send({ message: `${error.message}` });
            }
            const { email, publicAddress } = yield auth_service_1.default.validateDIDToken(DIDToken);
            let user = yield user_model_1.User.findById(email);
            if (!user) {
                user = yield user_model_1.User.create({
                    _id: email,
                    walletAddress: publicAddress
                });
            }
            return response.status(constants_utils_1.OK).send({
                message: "success",
                data: {
                    email: email,
                    walletAddress: publicAddress,
                }
            });
        });
    }
}
exports.default = new AuthController();
