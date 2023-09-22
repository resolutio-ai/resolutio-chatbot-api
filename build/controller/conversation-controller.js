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
exports.ConversationController = void 0;
//import { userModel } from "../models/user.model";
const constants_utils_1 = require("../utils/constants.utils");
class ConversationController {
    getPreviousConversations(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request.query;
            if (!userId) {
                response.status(constants_utils_1.BAD_REQUEST).send({ message: "Invalid UserId" });
            }
            // let user = await userModel.findById(userId);
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
                                    "parts": ["Hello, how are you?"]
                                },
                                "status": constants_utils_1.Status.Sent,
                                "timestamp": "2023-09-11T12:00:00Z"
                            },
                            {
                                "id": "message2",
                                //"authorRole": Roles.System,
                                "content": {
                                    "contentType": constants_utils_1.ContentType.Text,
                                    "parts": ["I'm good. How can I assist you today?"]
                                },
                                "status": constants_utils_1.Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message3",
                                "authorRole": constants_utils_1.Roles.User,
                                "content": {
                                    "content_type": constants_utils_1.ContentType.Text,
                                    "parts": ["I have a question about my account."]
                                },
                                "status": constants_utils_1.Status.Sent,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message4",
                                //"authorRole": Roles.System,
                                "content": {
                                    "content_type": constants_utils_1.ContentType.Text,
                                    "parts": ["What would you like to know?"]
                                },
                                "status": constants_utils_1.Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                        ]
                    },
                    {
                        "_id": "conversation2",
                        "messages": [
                            {
                                "id": "message1",
                                "authorRole": constants_utils_1.Roles.User,
                                "content": {
                                    "contentType": constants_utils_1.ContentType.Text,
                                    "parts": ["What is IP rights?"]
                                },
                                "status": constants_utils_1.Status.Sent,
                                "timestamp": "2023-09-11T12:00:00Z"
                            },
                            {
                                "id": "message2",
                                //"authorRole": Roles.System,
                                "content": {
                                    "contentType": constants_utils_1.ContentType.Text,
                                    "parts": ["Intellectual property rights are the rights given to persons over the creations of their minds."]
                                },
                                "status": constants_utils_1.Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message3",
                                "authorRole": constants_utils_1.Roles.User,
                                "content": {
                                    "content_type": constants_utils_1.ContentType.Text,
                                    "parts": ["Awesome. What are some of mine?"]
                                },
                                "status": constants_utils_1.Status.Sent,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message4",
                                //"authorRole": Roles.System,
                                "content": {
                                    "content_type": constants_utils_1.ContentType.Text,
                                    "parts": ["Patents, trademarks, copyrights, and trade secrets are valuable assets of the company and understanding how they work and how they are created is critical to knowing how to protect them"]
                                },
                                "status": constants_utils_1.Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                        ]
                    },
                ]
            });
        });
    }
    sendUserMessage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, messageContent, conversationId, timeStamp, isLoggedIn } = request.body;
            //chatbot AI interaction
            const chatbotReply = "";
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
        });
    }
    saveMessageToDB(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // let user = await userModel.findById(request.userId)
            // if (!user) {
            //     user = await userModel.create({
            //         userId: request.userId,
            //         conversations: []
            //     });
            // }
            // const uploadResponse = await uploadText(JSON.stringify(request));
            // if (!uploadResponse?.data?.cid) {
            //     //Log                
            // } else {
            //     const userConversation = user.conversations[ZERO];
            //     const messageId = userConversation.messages.length++ ?? ONE;
            //     userConversation.messages.push({
            //         authorRole: Roles.User,
            //         content: {
            //             contentType: ContentType.Text,
            //             parts: [request.messageContent, request.chatbotReply],
            //             cid: uploadResponse?.data?.cid
            //         },
            //         id: `${messageId}`,
            //         status: Status.Received,
            //         timeStamp: request.timeStamp
            //     });
            //     await user.save();
            // }
        });
    }
}
exports.ConversationController = ConversationController;
