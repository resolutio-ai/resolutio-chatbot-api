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
exports.getApiKey = void 0;
const sdk_1 = __importDefault(require("@lighthouse-web3/sdk"));
const axios_1 = __importDefault(require("axios"));
const ethers_1 = require("ethers");
const env_config_1 = require("../../config/env.config");
const signAuthMessage = (privateKey, messageRequested) => __awaiter(void 0, void 0, void 0, function* () {
    const signer = new ethers_1.ethers.Wallet(privateKey);
    return yield signer.signMessage(messageRequested);
});
const getApiKey = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!env_config_1.PUBLIC_KEY || !env_config_1.PRIVATE_KEY) {
        throw new Error(!env_config_1.PUBLIC_KEY ? 'Public Key is missing' : 'Private Key is Missing');
    }
    const verificationMessage = (yield axios_1.default.get(`${env_config_1.GET_APIKEY_ENDPOINT}${env_config_1.PUBLIC_KEY}`)).data;
    const signedMessage = yield signAuthMessage(env_config_1.PRIVATE_KEY, verificationMessage);
    return yield sdk_1.default.getApiKey(env_config_1.PUBLIC_KEY, signedMessage);
});
exports.getApiKey = getApiKey;
