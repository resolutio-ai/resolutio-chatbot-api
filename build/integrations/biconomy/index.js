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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialUserOp = exports.executeUserOp = exports.createAccount = void 0;
const dotenv_1 = require("dotenv");
const bundler_1 = require("@biconomy/bundler");
const account_1 = require("@biconomy/account");
const modules_1 = require("@biconomy/modules");
const ethers_1 = require("ethers");
const core_types_1 = require("@biconomy/core-types");
const paymaster_1 = require("@biconomy/paymaster");
(0, dotenv_1.config)();
let smartAccount;
let bundler;
let address;
const getPayMaster = (chainId) => {
    return new paymaster_1.BiconomyPaymaster({
        paymasterUrl: `${process.env.PAYMASTER_BASE_URL}/${core_types_1.ChainId}/${process.env.PAYMASTER_API_KEY}`
    });
};
const getWallet = (rpcUrl) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    return new ethers_1.Wallet(process.env.PRIVATE_KEY || "", provider);
};
const getBundler = (chainId) => {
    return bundler !== null && bundler !== void 0 ? bundler : (bundler = new bundler_1.Bundler({
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
        chainId: chainId,
        entryPointAddress: account_1.DEFAULT_ENTRYPOINT_ADDRESS,
    }));
};
const getModule = (rpcUrl) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modules_1.ECDSAOwnershipValidationModule.create({
        signer: getWallet(rpcUrl),
        moduleAddress: modules_1.DEFAULT_ECDSA_OWNERSHIP_MODULE
    });
});
function createAccount(chainId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rpcUrl = "";
        smartAccount !== null && smartAccount !== void 0 ? smartAccount : (smartAccount = yield account_1.BiconomySmartAccountV2.create({
            chainId: core_types_1.ChainId.POLYGON_MUMBAI,
            bundler: bundler,
            paymaster: getPayMaster(chainId),
            entryPointAddress: account_1.DEFAULT_ENTRYPOINT_ADDRESS,
            defaultValidationModule: yield getModule(rpcUrl),
            activeValidationModule: yield getModule(rpcUrl)
        }));
        address !== null && address !== void 0 ? address : (address = yield smartAccount.getAccountAddress());
        return smartAccount;
    });
}
exports.createAccount = createAccount;
const executeUserOp = (partialUserOp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userOpResponse = yield smartAccount.sendUserOp(partialUserOp);
        const transactionDetails = yield userOpResponse.wait();
        if (!transactionDetails || !transactionDetails.receipt || !transactionDetails.receipt.transactionHash) {
            throw new Error(!transactionDetails ? "Invalid Transaction Details Returned"
                : !transactionDetails.receipt ? "Invalid Transaction Receipt Returned"
                    : "Invalid Transaction Hash Returned");
        }
        return transactionDetails.receipt.transactionHash;
    }
    catch (error) {
        throw new Error("Error Sending User Operation" + `\n${error.message}`);
    }
});
exports.executeUserOp = executeUserOp;
const getPartialUserOp = (transaction, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    yield createAccount(chainId);
    let partialUserOp = yield smartAccount.buildUserOp([transaction]);
    const biconomyPaymaster = smartAccount.paymaster;
    let paymasterServiceData = {
        mode: paymaster_1.PaymasterMode.SPONSORED,
        smartAccountInfo: {
            name: 'BICONOMY',
            version: '2.0.0'
        },
    };
    try {
        const paymasterAndDataResponse = yield biconomyPaymaster.getPaymasterAndData(partialUserOp, paymasterServiceData);
        partialUserOp.paymasterAndData =
            paymasterAndDataResponse.paymasterAndData;
        return partialUserOp;
    }
    catch (error) {
        throw new Error("Error while fetching paymaster data" + `\n${error.message}`);
    }
});
exports.getPartialUserOp = getPartialUserOp;
