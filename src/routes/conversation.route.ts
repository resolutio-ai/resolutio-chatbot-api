import { Router } from "express";
import conversationController from "../controller/conversation.controller";

export default Router()
    .get("/", conversationController.getPreviousConversations)
    .post("/", conversationController.sendUserMessage);
