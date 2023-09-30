import * as dotenv from 'dotenv';
dotenv.config();
import fs from "fs";
import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../config/env.config';

const signAuthMessage = async () => {
    const provider = new ethers.JsonRpcProvider();
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const messageRequested = (await lighthouse.getAuthMessage(PUBLIC_KEY)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
}

export const decrypt = async (cid: string) => {

    // Get file encryption key
    const signedMessage = await signAuthMessage();
    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
        cid,
        PUBLIC_KEY,
        signedMessage
    );

    if (!fileEncryptionKey?.data?.key) {
        throw new Error("Invalid encryption key");
    }

    // Decrypt File
    return await lighthouse.decryptFile(
        cid,
        fileEncryptionKey.data.key
    );
}