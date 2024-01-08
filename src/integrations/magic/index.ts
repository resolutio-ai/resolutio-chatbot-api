import { Magic } from "@magic-sdk/admin";
import { MAGIC_SECRET_KEY } from "../../config/env.config";

let instance: Magic | undefined = undefined;

export const getMagicAdmin = () => {
    if (instance) return instance;   

    instance = new Magic(MAGIC_SECRET_KEY);
    
    return instance;
};

export const getMagicClient = () => {
    const magicPubKey = process.env.MAGIC_PUBLIC_KEY;
    if (magicPubKey === undefined || magicPubKey === "") {
        throw new Error("NEXT_PUBLIC_MAGIC_PUBLIC_KEY");
    }

    if (typeof window === "undefined") {
        throw new Error(
            "Magic web client should be used in non-SSR environments"
        );
    }

    if (!instance) {
        // Todo: setup chain config
        instance = new Magic(magicPubKey);
    }

    return instance;
};