type indexable = {
    [key: string]: any;
};

interface NetworkConfig extends indexable {
    polygonTestnet: {
        rpcUrl: string;
        chainId: number;
        explorerUrl: string;
        contractAddress: string
    };
    scrollTestnet: {
        rpcUrl: string;
        chainId: number;
        explorerUrl: string;
        contractAddress: string
    };
    optimismTestnet: {
        rpcUrl: string;
        chainId: number;
        explorerUrl: string;
        contractAddress: string
    };
}

const networkConfig: NetworkConfig = {
    FVMTestNet: {
        rpcUrl: "https://api.calibration.node.glif.io/rpc/v1",
        chainId: 314159,
        explorerUrl: "https://beryx.zondax.ch/",
        contractAddress: "0x9b70257eD0c12468174a625e3Fc77747C6CA6479"
    },
    polygonTestnet: {
        rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
        chainId: 80001,
        explorerUrl: "https://mumbai.polygonscan.com",
        contractAddress: "0xa7c33f52de3FD76408644A7c87D164cDef4A49DD"
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

const getNetworkConfig = (chainName: string) => {
    return networkConfig[chainName];
};

const getSafeServiceUrl = (chainName: string) => {
    return networkConfig[chainName].safeService;
};

const getTransactionExplorerUrl = (txHash: string, chainName: string): string => {
    const explorerUrl = networkConfig[chainName].explorerUrl;

    return `https://${explorerUrl}/tx/${txHash}`;
};

const getAddressExplorerUrl = (address: string, chainName: string): string => {
    const explorerUrl = networkConfig[chainName].explorerUrl;

    return `https://${explorerUrl}/address/${address}`;
};

export { getAddressExplorerUrl, getNetworkConfig, getTransactionExplorerUrl, getSafeServiceUrl }