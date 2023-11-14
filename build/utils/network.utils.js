"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSafeServiceUrl = exports.getTransactionExplorerUrl = exports.getNetworkConfig = exports.getAddressExplorerUrl = void 0;
const networkConfig = {
    FVMTestNet: {
        rpcUrl: "https://rpc.ankr.com/filecoin_testnet",
        chainId: 314159,
        explorerUrl: "https://beryx.zondax.ch/",
        contractAddress: ""
    },
    polygonTestnet: {
        rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
        chainId: 80001,
        explorerUrl: "https://mumbai.polygonscan.com",
        contractAddress: ""
    },
    scrollTestnet: {
        rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/zHEgzvGizW0dHlGJ7J6ZP477wnNlepoF",
        chainId: 534351,
        explorerUrl: "https://polygonscan.com",
        contractAddress: ""
    },
    optimismTestnet: {
        rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/zHEgzvGizW0dHlGJ7J6ZP477wnNlepoF",
        chainId: 420,
        explorerUrl: "https://goerli-optimism.etherscan.io/",
        contractAddress: ""
    },
};
const getNetworkConfig = (chainName) => {
    return networkConfig[chainName];
};
exports.getNetworkConfig = getNetworkConfig;
const getSafeServiceUrl = (chainName) => {
    return networkConfig[chainName].safeService;
};
exports.getSafeServiceUrl = getSafeServiceUrl;
const getTransactionExplorerUrl = (txHash, chainName) => {
    const explorerUrl = networkConfig[chainName].explorerUrl;
    return `https://${explorerUrl}/tx/${txHash}`;
};
exports.getTransactionExplorerUrl = getTransactionExplorerUrl;
const getAddressExplorerUrl = (address, chainName) => {
    const explorerUrl = networkConfig[chainName].explorerUrl;
    return `https://${explorerUrl}/address/${address}`;
};
exports.getAddressExplorerUrl = getAddressExplorerUrl;
