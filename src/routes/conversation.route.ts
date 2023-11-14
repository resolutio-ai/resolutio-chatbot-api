import { Router } from "express";
import { ConversationController } from "../controller/conversation.controller";

const conversationController = new ConversationController();

module.exports = Router()
    .get("/", conversationController.getPreviousConversations)
    .post("/", conversationController.sendUserMessage);