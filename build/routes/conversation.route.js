"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_controller_1 = __importDefault(require("../controller/conversation.controller"));
exports.default = (0, express_1.Router)()
    .get("/", conversation_controller_1.default.getPreviousConversations)
    .post("/", conversation_controller_1.default.sendUserMessage);
