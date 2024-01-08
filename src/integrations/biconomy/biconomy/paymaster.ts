
import { BiconomyPaymaster } from "@biconomy/paymaster";
import { getViemChain } from "../../../utils/environment.utils";

//Get a chain Id based on the current environment
const chainId = getViemChain().id

const paymasterUrl: {
  [key: number]: string;
} = {
  80001: "https://paymaster.biconomy.io/api/v1/80001/Ph0ob5AC0.b5edb79a-f0bf-4991-baa1-99c5ecff1179",
  137: "https://paymaster.biconomy.io/api/v1/137/hUgNRQ6pZ.e73d8f7b-7fe5-405e-9fd6-a9c657682b58"
};

if (!paymasterUrl) throw new Error("Paymaster URL not configured");

let paymaster: BiconomyPaymaster | undefined;

const getPaymaster = () => {
  if (paymaster) return paymaster;

  paymaster = new BiconomyPaymaster({
    paymasterUrl: paymasterUrl[chainId],
  });

  return paymaster;
};

export { getPaymaster };
