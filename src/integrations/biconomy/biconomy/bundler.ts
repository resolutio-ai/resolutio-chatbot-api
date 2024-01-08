import { Bundler } from "@biconomy/bundler";
import { DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { polygonMumbai } from "viem/chains";
import { getViemChain } from "../../../utils/environment.utils";

//Get a chain Id based on the current environment
const chainId = getViemChain()?.id;

const BUNDLER_URLS: {
  [key: number]: string
} = {
  80001: `https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
  137: "https://bundler.biconomy.io/api/v2/137/fAPY9R6ts.gg1v9570-521z-59jk-gt69-9654m83c0m37"
};

let bundler: Bundler | undefined;

const getBundler = () => {
  if (bundler) return bundler;

  //Creatin a bundler instance if it does not already exist
  bundler = new Bundler({
    bundlerUrl: BUNDLER_URLS[chainId],
    chainId,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  return bundler;
};

export { getBundler };
