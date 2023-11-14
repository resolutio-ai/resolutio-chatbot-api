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
exports.signAuthMessage = void 0;
const ethers_1 = require("ethers");
const env_config_1 = require("../../config/env.config");
const sdk_1 = __importDefault(require("@lighthouse-web3/sdk"));
const signAuthMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider();
    const signer = new ethers_1.ethers.Wallet(env_config_1.PRIVATE_KEY, provider);
    const messageRequested = (yield sdk_1.default.getAuthMessage(env_config_1.PUBLIC_KEY)).data.message;
    const signedMessage = yield signer.signMessage(messageRequested);
    return signedMessage;
});
exports.signAuthMessage = signAuthMessage;
