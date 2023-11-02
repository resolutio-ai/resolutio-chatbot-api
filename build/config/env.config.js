"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAGIC_SECRET = exports.TESTNET_WHITELIST_CONTRACT_ADDRESS = exports.MAINNET_WHITELIST_CONTRACT_ADDRESS = exports.WEB3_ENVIRONMENT = exports.CHATBOT_BASEURL = exports.GATEWAY_BASEURL = exports.SIGNED_MESSAGE = exports.GET_APIKEY_ENDPOINT = exports.PORT = exports.PUBLIC_KEY = exports.PRIVATE_KEY = exports.LIGHT_API_KEY = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: path_1.default.resolve(process.cwd(), ".env.test"),
});
// Validate and export the required environment variables
exports.LIGHT_API_KEY = validateEnvVariable('LIGHT_API_KEY');
exports.PRIVATE_KEY = validateEnvVariable('PRIVATE_KEY');
exports.PUBLIC_KEY = validateEnvVariable('PUBLIC_KEY');
exports.PORT = validateEnvVariable('PORT');
exports.GET_APIKEY_ENDPOINT = validateEnvVariable('GET_APIKEY_ENDPOINT');
exports.SIGNED_MESSAGE = validateEnvVariable('SIGNED_MESSAGE');
exports.GATEWAY_BASEURL = validateEnvVariable('GATEWAY_BASEURL');
exports.CHATBOT_BASEURL = validateEnvVariable('CHATBOT_BASEURL');
exports.WEB3_ENVIRONMENT = validateEnvVariable('WEB3_ENVIRONMENT');
exports.MAINNET_WHITELIST_CONTRACT_ADDRESS = validateEnvVariable('MAINNET_WHITELIST_CONTRACT_ADDRESS');
exports.TESTNET_WHITELIST_CONTRACT_ADDRESS = validateEnvVariable('TESTNET_WHITELIST_CONTRACT_ADDRESS');
exports.MAGIC_SECRET = validateEnvVariable('MAGIC_SECRET_KEY');
// Helper function to validate environment variables
function validateEnvVariable(variableName) {
    const value = process.env[variableName];
    if (!value) {
        throw new Error(`Missing value for environment variable: ${variableName}`);
    }
    return value;
}
