"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChatRequestSchema = void 0;
const yup_1 = __importDefault(require("yup"));
exports.sendChatRequestSchema = yup_1.default.object().shape({
    userId: yup_1.default.string(),
    messageContent: yup_1.default.string().required("Users message is required"),
    timeStamp: yup_1.default.string().required("timeStamp is required"),
    isLoggedIn: yup_1.default.bool().required("User's log in status is required")
});
