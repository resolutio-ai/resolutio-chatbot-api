
import { Chain } from "viem";
import { base, baseGoerli, filecoinCalibration, optimismGoerli, polygon, polygonMumbai, scrollTestnet } from "viem/chains";
import { DEFAULT_CHAIN } from "./constants.utils";

export type Web3Environment = "polygonTestnet" | "scrollTestnet" | "optimismTestnet" | "filecoinTestnet";

type ChainDictionary = {
    [key in Web3Environment]: Chain
}

const chain: ChainDictionary = {
    polygonTestnet: polygonMumbai,
    scrollTestnet: scrollTestnet,
    optimismTestnet: optimismGoerli,
    filecoinTestnet: filecoinCalibration
}

const getViemChain = () : Chain => {
    //Todo: load up chain from env    
    return chain[DEFAULT_CHAIN];
}

export { getViemChain }