import lighthouse from '@lighthouse-web3/sdk'
import { LIGHT_API_KEY, PUBLIC_KEY, SIGNED_MESSAGE } from '../../config/env.config';

export const uploadText = async (message: string) => {
    if (!LIGHT_API_KEY) {
        throw new Error("Invalid API Key");
    }

    if (!PUBLIC_KEY || !SIGNED_MESSAGE) {
        throw new Error(!PUBLIC_KEY ? 'Public Key is missing' : 'Private Key is Missing');
    }    

    return await lighthouse.textUploadEncrypted(message, LIGHT_API_KEY, PUBLIC_KEY, SIGNED_MESSAGE);
}