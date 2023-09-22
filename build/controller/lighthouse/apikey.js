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
const signAuthMessage = (privateKey, messageRequested) => __awaiter(void 0, void 0, void 0, function* () {
    const signer = new ethers_1.ethers.Wallet(privateKey);
    return yield signer.signMessage(messageRequested);
});
const getApiKey = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = {
        publicKey: '0xFB403ECFdEC9faC6f00Ac07Fe4888b7C89599536',
        privateKey: '7039070945cb8e442268fd1e58e8f7f5e69defca7d9086b4793f93f4db060b35'
    };
    const verificationMessage = (yield axios_1.default.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`)).data;
    const signedMessage = yield signAuthMessage(wallet.privateKey, verificationMessage);
    return yield sdk_1.default.getApiKey(wallet.publicKey, signedMessage);
});
exports.getApiKey = getApiKey;
