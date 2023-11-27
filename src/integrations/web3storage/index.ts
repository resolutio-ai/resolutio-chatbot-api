import { Web3Storage } from 'web3.storage'
import { WEB3STORAGE_TOKEN } from '../../config/env.config'

function makeStorageClient() {
    return new Web3Storage({ token: WEB3STORAGE_TOKEN })
}

export async function retrieveFiles(cid: string) {
    const client = makeStorageClient()
    const res = await client.get(cid)

    if (!res || !res.ok) {
        throw new Error(!res ? `failed to get ${cid} information` : `failed to get ${cid} - [${res.status}] ${res.statusText}`);
    }

    // unpack File objects from the response
    return await res.files();
}

export const storeFiles = async (files: File[]) => {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
};