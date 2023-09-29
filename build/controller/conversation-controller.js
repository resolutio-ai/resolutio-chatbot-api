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
exports.ConversationController = void 0;
const user_model_1 = require("../models/user.model");
const constants_utils_1 = require("../utils/constants.utils");
const upload_1 = require("./lighthouse/upload");
const axios_1 = __importDefault(require("axios"));
const env_config_1 = require("../config/env.config");
class ConversationController {
    getPreviousConversations(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request.query;
            if (!userId) {
                response.status(constants_utils_1.BAD_REQUEST).send({ message: "Invalid UserId" });
            }
            //let user = await User.findById(userId);
            // return response.status(OK).send(user);
            response.status(constants_utils_1.OK).send({
                "userId": userId,
                "conversationIds": [
                    {
                        "_id": "conversation1",
                        "messages": [
                            {
                                "id": "message1",
                                "authorRole": constants_utils_1.Roles.User,
                                "content": {
                                    "contentType": constants_utils_1.ContentType.Text,
                                    "parts": ["Hello, how are you?", "I'm good. How can I assist you today?"]
                                },
                                "status": constants_utils_1.Status.Sent,
                                "timestamp": "2023-09-11T12:00:00Z"
                            },
                            {
                                "id": "message3",
                                "authorRole": constants_utils_1.Roles.User,
                                "content": {
                                    "content_type": constants_utils_1.ContentType.Text,
                                    "parts": ["I have a question about my account.", "What would you like to know?"]
                                },
                                "status": constants_utils_1.Status.Sent,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message4",
                                "authorRole": constants_utils_1.Roles.System,
                                "content": {
                                    "content_type": constants_utils_1.ContentType.Text,
                                    "parts": ["What are intellectual property rights?", "Intellectual property rights are the rights given to persons over the creations of their minds."]
                                },
                                "status": constants_utils_1.Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                        ]
                    }
                ]
            });
        });
    }
    sendUserMessage(request, response) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, messageContent, conversationId, timeStamp, isLoggedIn } = request.body;
                const chatbotResponse = (yield axios_1.default.post(`${env_config_1.CHATBOT_BASEURL}/bot`, {
                    userId,
                    category: "General IP Queries",
                    message: messageContent,
                    timeStamp
                })).data;
                const chatbotReply = chatbotResponse.result.toString().trim();
                // if (isLoggedIn) {
                //     const messageRecord = {
                //         messageContent,
                //         chatbotReply,
                //         timeStamp,
                //         userId
                //     }
                //     await this.saveMessageToDB(messageRecord);
                // }
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
                console.log(error.response);
                return response.status((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : constants_utils_1.BAD_REQUEST).send(error.message);
            }
        });
    }
    saveMessageToDB(request) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_model_1.User.findById(request.userId);
            if (!user) {
                user = yield user_model_1.User.create({
                    userId: request.userId,
                    conversations: []
                });
            }
            const uploadResponse = yield (0, upload_1.uploadText)(JSON.stringify(request));
            if (!((_a = uploadResponse === null || uploadResponse === void 0 ? void 0 : uploadResponse.data) === null || _a === void 0 ? void 0 : _a.cid)) {
                //Log                
            }
            else {
                const userConversation = user.conversations[constants_utils_1.ZERO];
                const messageId = (_b = userConversation.messages.length++) !== null && _b !== void 0 ? _b : constants_utils_1.ONE;
                userConversation.messages.push({
                    authorRole: constants_utils_1.Roles.User,
                    content: {
                        contentType: constants_utils_1.ContentType.Text,
                        parts: [request.messageContent, request.chatbotReply],
                        cid: (_c = uploadResponse === null || uploadResponse === void 0 ? void 0 : uploadResponse.data) === null || _c === void 0 ? void 0 : _c.cid
                    },
                    id: `${messageId}`,
                    status: constants_utils_1.Status.Received,
                    timeStamp: request.timeStamp
                });
                yield user.save();
            }
        });
    }
}
exports.ConversationController = ConversationController;
