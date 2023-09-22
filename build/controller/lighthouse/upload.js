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
exports.uploadText = void 0;
const sdk_1 = __importDefault(require("@lighthouse-web3/sdk"));
const env_config_1 = require("../../config/env.config");
const uploadText = (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!env_config_1.LIGHT_API_KEY) {
        throw new Error("Invalid API Key");
    }
    if (!env_config_1.PUBLIC_KEY || !env_config_1.SIGNED_MESSAGE) {
        throw new Error(!env_config_1.PUBLIC_KEY ? 'Public Key is missing' : 'Private Key is Missing');
    }
    return yield sdk_1.default.textUploadEncrypted(message, env_config_1.LIGHT_API_KEY, env_config_1.PUBLIC_KEY, env_config_1.SIGNED_MESSAGE);
});
exports.uploadText = uploadText;
