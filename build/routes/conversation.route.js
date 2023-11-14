"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_controller_1 = require("../controller/conversation.controller");
const conversationController = new conversation_controller_1.ConversationController();
module.exports = (0, express_1.Router)()
    .get("/", conversationController.getPreviousConversations)
    .post("/", conversationController.sendUserMessage);
