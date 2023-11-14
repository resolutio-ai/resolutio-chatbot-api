"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMagicClient = exports.getMagicAdmin = void 0;
const admin_1 = require("@magic-sdk/admin");
const env_config_1 = require("../../config/env.config");
let instance = undefined;
const getMagicAdmin = () => {
    if (instance)
        return instance;
    const magicSecretKey = env_config_1.MAGIC_SECRET;
    if (magicSecretKey === undefined || magicSecretKey === "")
        throw new Error("MAGIC_SECRET_KEY");
    instance = new admin_1.Magic(magicSecretKey);
    return instance;
};
exports.getMagicAdmin = getMagicAdmin;
const getMagicClient = () => {
    const magicPubKey = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY;
    if (magicPubKey === undefined || magicPubKey === "") {
        throw new Error("NEXT_PUBLIC_MAGIC_PUBLIC_KEY");
    }
    if (typeof window === "undefined") {
        throw new Error("Magic web client should be used in non-SSR environments");
    }
    if (!instance) {
        // Todo: setup chain config
        instance = new admin_1.Magic(magicPubKey);
    }
    return instance;
};
exports.getMagicClient = getMagicClient;
