import lighthouse from '@lighthouse-web3/sdk';
import { signAuthMessage } from './signAuthMessage';
import { PUBLIC_KEY } from '../../config/env.config';


export const applyAccessControl = async (cid: string) => {
    try {
        //NB: Our current verfication contract is deployed on FVM main-net which is currently of part of the access control allowed chain         
        const conditions = [
            {
                id: 1,
                chain: "FVM",
                method: "verifyUser",
                standardContractType: "Custom",
                contractAddress: "0x6A0a62FE073AC284fc5A65adD1EfC49C5Cb92eCf",
                returnValueTest: {
                    comparator: "==",
                    value: true
                }
            },
        ];

        // Aggregator is what kind of operation to apply to access conditions
        // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
        const aggregator = "([1])";

        const signedMessage = await signAuthMessage();

        const response = await lighthouse.applyAccessCondition(
            PUBLIC_KEY,
            cid,
            signedMessage,
            conditions,
            aggregator
        );

        return response;
    } catch (error: any) {
        throw error;
    }
}