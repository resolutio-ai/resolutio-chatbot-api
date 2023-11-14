"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeFiles = exports.retrieveFiles = void 0;
const web3_storage_1 = require("web3.storage");
function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN;
}
function makeStorageClient() {
    return new web3_storage_1.Web3Storage({ token: getAccessToken() });
}
function retrieveFiles(cid) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = makeStorageClient();
        const res = yield client.get(cid);
        if (!res || !res.ok) {
            throw new Error(!res ? `failed to get ${cid} information` : `failed to get ${cid} - [${res.status}] ${res.statusText}`);
        }
        // unpack File objects from the response
        return yield res.files();
    });
}
exports.retrieveFiles = retrieveFiles;
const storeFiles = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const client = makeStorageClient();
    const cid = yield client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
});
exports.storeFiles = storeFiles;
