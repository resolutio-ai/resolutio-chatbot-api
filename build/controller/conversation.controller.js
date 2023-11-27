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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const constants_utils_1 = require("../utils/constants.utils");
const upload_1 = require("../integrations/lighthouse/upload");
const axios_1 = __importDefault(require("axios"));
const env_config_1 = require("../config/env.config");
const decrypt_1 = require("../integrations/lighthouse/decrypt");
const accesscontrol_1 = require("../integrations/lighthouse/accesscontrol");
class ConversationController {
    sendUserMessage(request, response) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, messageContent, conversationId, timeStamp, isLoggedIn } = request.body;
                if (!messageContent || !timeStamp) {
                    return response.status(constants_utils_1.BAD_REQUEST).send({ message: !messageContent ? "Invalid 'messageContent' value" : "Invalid 'timeStamp' value" });
                }
                const chatbotResponse = (yield axios_1.default.post(`${env_config_1.CHATBOT_BASEURL}/bot`, {
                    userId: userId !== null && userId !== void 0 ? userId : "",
                    category: "General IP Queries",
                    message: messageContent,
                    timeStamp
                })).data;
                if (!chatbotResponse.result) {
                    return response.status(constants_utils_1.INTERNAL_SERVER_ERROR).send({ message: "Chatbot Server Error" });
                }
                const chatbotReply = chatbotResponse.result.toString().trim();
                if (isLoggedIn) {
                    const messageRecord = {
                        messageContent,
                        chatbotReply,
                        timeStamp,
                        userId
                    };
                    yield this.saveMessageToDB(messageRecord);
                }
                return response.status(constants_utils_1.OK).send({
                    userId: userId,
                    conversationIds: [
                        {
                            _id: "conversation2",
                            messages: [
                                {
                                    id: "message1",
                                    authorRole: constants_utils_1.Roles.User,
                                    content: {
                                        "contentType": constants_utils_1.ContentType.Text,
                                        "parts": [messageContent, chatbotReply]
                                    },
                                    status: constants_utils_1.Status.Sent,
                                    timeStamp
                                }
                            ]
                        },
                    ]
                });
            }
            catch (error) {
                return response.status((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : constants_utils_1.BAD_REQUEST).send((_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.statusText) !== null && _d !== void 0 ? _d : error.message);
            }
        });
    }
    saveMessageToDB(request) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_model_1.User.findById(request.userId);
                if (!user) {
                    user = yield user_model_1.User.create({
                        userId: request.userId,
                        conversations: []
                    });
                }
                const uploadResponse = yield (0, upload_1.uploadText)(JSON.stringify(request));
                if (!((_a = uploadResponse === null || uploadResponse === void 0 ? void 0 : uploadResponse.data) === null || _a === void 0 ? void 0 : _a.cid)) {
                    throw new Error("Error uploading to light house");
                }
                else {
                    const userConversation = user.conversations[constants_utils_1.ZERO];
                    const messageId = (_b = userConversation.messages.length++) !== null && _b !== void 0 ? _b : constants_utils_1.ONE;
                    //NB: Our current verfication contract is deployed on FVM mainnet which is currently not part of the access control allowed chains         
                    yield (0, accesscontrol_1.applyAccessControl)((_c = uploadResponse === null || uploadResponse === void 0 ? void 0 : uploadResponse.data) === null || _c === void 0 ? void 0 : _c.cid, user.walletAddress);
                    userConversation.messages.push({
                        authorRole: constants_utils_1.Roles.User,
                        content: {
                            contentType: constants_utils_1.ContentType.Text,
                            parts: [request.messageContent, request.chatbotReply],
                            cid: (_d = uploadResponse === null || uploadResponse === void 0 ? void 0 : uploadResponse.data) === null || _d === void 0 ? void 0 : _d.cid
                        },
                        id: `${messageId}`,
                        status: constants_utils_1.Status.Received,
                        timeStamp: request.timeStamp
                    });
                    yield user.save();
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    retrieveAndDecryptMessages(conversation) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMessagesPromises = conversation.messages.map((message, index) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (!((_a = message === null || message === void 0 ? void 0 : message.content) === null || _a === void 0 ? void 0 : _a.cid)) {
                    throw new Error(`Error: Message at ${index} does not have a valid CID`);
                }
                const decryptedInfo = yield (0, decrypt_1.decrypt)(message.content.cid);
                if (!decryptedInfo) {
                    throw new Error(`Error decrypting ${(_b = message === null || message === void 0 ? void 0 : message.content) === null || _b === void 0 ? void 0 : _b.cid}`);
                }
                return decryptedInfo;
            }));
            return yield Promise.all(userMessagesPromises);
        });
    }
    getPreviousConversations(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request.query;
            if (!userId) {
                return response.status(constants_utils_1.BAD_REQUEST).send({ message: "Invalid UserId" });
            }
            try {
                let user = yield user_model_1.User.findById(userId);
                if (!user) {
                    return response.status(constants_utils_1.NOT_FOUND).send({ message: "User not found" });
                }
                const userMessages = yield this.retrieveAndDecryptMessages(user.conversations[constants_utils_1.ZERO]);
                return response.status(constants_utils_1.OK).send({ user, userMessages });
            }
            catch (error) {
                return response.status(constants_utils_1.INTERNAL_SERVER_ERROR).send({ message: "Error retrieving previous conversations" });
            }
        });
    }
}
exports.default = new ConversationController();
