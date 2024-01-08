import { PaymasterMode } from "@biconomy/paymaster";
import { getPaymaster } from "./paymaster";
import { getSmartAccount } from "./smartAccount";
import { Address } from "viem";
import { Transaction } from "@biconomy/core-types";

const paymaster = getPaymaster();

const sponsorTransaction = async (tx: Transaction) => {
  const smartAccount = await getSmartAccount();
  const userOperation = await smartAccount.buildUserOp([tx]);
  const response = await paymaster.getPaymasterAndData(userOperation, {
    mode: PaymasterMode.SPONSORED,
  });

  if (!response.paymasterAndData) throw new Error("Invalid response");
  const updatedUserOp = {
    ...userOperation,
    paymasterAndData: response.paymasterAndData,
  };
  const userOpResponse = await smartAccount.sendUserOp(updatedUserOp);

  const opReceipt = await userOpResponse.wait(1);
  return opReceipt.receipt.transactionHash as Address;
};

export { sponsorTransaction };
