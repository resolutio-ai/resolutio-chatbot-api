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
exports.applyAccessControl = void 0;
const sdk_1 = __importDefault(require("@lighthouse-web3/sdk"));
const signAuthMessage_1 = require("./signAuthMessage");
const env_config_1 = require("../../config/env.config");
const constants_utils_1 = require("../../utils/constants.utils");
const applyAccessControl = (cid, userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //NB: Our current verfication contract is deployed on FVM main-net which is currently of part of the access control allowed chain         
        const conditions = [
            {
                id: constants_utils_1.TWO,
                chain: "Calibration",
                method: "verifyUser",
                standardContractType: "Custom",
                contractAddress: env_config_1.WEB3_ENVIRONMENT === "Testnet" ? env_config_1.TESTNET_WHITELIST_CONTRACT_ADDRESS : env_config_1.MAINNET_WHITELIST_CONTRACT_ADDRESS,
                returnValueTest: {
                    comparator: "==",
                    value: true
                },
                parameters: [userAddress],
            },
        ];
        // Aggregator is what kind of operation to apply to access conditions
        // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
        const aggregator = "([1])";
        const signedMessage = yield (0, signAuthMessage_1.signAuthMessage)();
        const response = yield sdk_1.default.applyAccessCondition(env_config_1.PUBLIC_KEY, cid, signedMessage, conditions, aggregator);
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.applyAccessControl = applyAccessControl;
