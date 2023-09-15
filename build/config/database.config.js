"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => {
    mongoose_1.default
        .set("strictQuery", false)
        .connect(process.env.MONGODB_URI)
        .then(() => {
        console.log("Connected to database...");
    })
        .catch((error) => {
        console.error(error);
        throw error;
    });
};
exports.connectDatabase = connectDatabase;
