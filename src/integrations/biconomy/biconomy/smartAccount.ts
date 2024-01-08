import { BiconomySmartAccount } from "@biconomy/account";
import { ethers } from "ethers";
import { getPaymaster } from "./paymaster";
import { getBundler } from "./bundler";
import { getViemChain } from "../../../utils/environment.utils";
import { getMagicAdmin } from "../../magic";

let smartAccount: BiconomySmartAccount | undefined;

const getSmartAccount = async () => {
  if (smartAccount) return smartAccount;

  const magicProvider = getMagicAdmin();
  const paymaster = getPaymaster();
  const bundler = getBundler();

  smartAccount = await new BiconomySmartAccount({
    //Use magic to retrieve a signer
    signer: new ethers.providers.Web3Provider(magicProvider as any).getSigner(),
    chainId: getViemChain().id,
    bundler: bundler,
    paymaster: paymaster,
  }).init();

  return smartAccount;
};

export { getSmartAccount };
