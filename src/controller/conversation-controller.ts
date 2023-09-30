import { User } from "../models/user.model";
import { BAD_REQUEST, ContentType, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, ONE, Roles, Status, ZERO } from "../utils/constants.utils";
import { Request, Response } from "express";
import { uploadText } from "./lighthouse/upload";
import axios from "axios";
import { CHATBOT_BASEURL } from "../config/env.config";
import { IConversation } from "../models/interfaces.models";
import { decrypt } from "./lighthouse/decrypt";
import { applyAccessControl } from "./lighthouse/accesscontrol";

export class ConversationController {
    async sendUserMessage(request: Request, response: Response) {
        try {
            const { userId, messageContent, conversationId, timeStamp, isLoggedIn } = request.body;

            if (!messageContent || !timeStamp) {
                return response.status(BAD_REQUEST).send({ message: !messageContent ? "Invalid 'messageContent' value" : "Invalid 'timeStamp' value" })
            }

            const chatbotResponse = (
                await axios.post(
                    `${CHATBOT_BASEURL}/bot`,
                    {
                        userId: userId ?? "",
                        category: "General IP Queries",
                        message: messageContent,
                        timeStamp
                    }
                )
            ).data;

            if (!chatbotResponse.result) {
                return response.status(INTERNAL_SERVER_ERROR).send({ message: "Chatbot Server Error" });
            }

            const chatbotReply: string = chatbotResponse.result.toString().trim();

            if (isLoggedIn) {
                const messageRecord = {
                    messageContent,
                    chatbotReply,
                    timeStamp,
                    userId
                }

                await this.saveMessageToDB(messageRecord);
            }

            return response.status(OK).send({
                userId: userId,
                conversationIds: [
                    {
                        _id: "conversation2",
                        messages: [
                            {
                                id: "message1",
                                authorRole: Roles.User,
                                content: {
                                    "contentType": ContentType.Text,
                                    "parts": [messageContent, chatbotReply]
                                },
                                status: Status.Sent,
                                timeStamp
                            }
                        ]
                    },
                ]
            });
        } catch (error: any) {
            return response.status(error?.response?.status ?? BAD_REQUEST).send(error?.response?.statusText ?? error.message)
        }
    }

    private async saveMessageToDB(request: {
        messageContent: string,
        chatbotReply: string,
        timeStamp: Date,
        userId: string
    }) {
        try {
            let user = await User.findById(request.userId)

            if (!user) {
                user = await User.create({
                    userId: request.userId,
                    conversations: []
                });
            }

            const uploadResponse = await uploadText(JSON.stringify(request));

            if (!uploadResponse?.data?.cid) {
                throw new Error("");
            } else {
                const userConversation = user.conversations[ZERO];
                const messageId = userConversation.messages.length++ ?? ONE;

                //NB: Our current verfication contract is deployed on FVM mainnet which is currently not part of the access control allowed chains         
                //await applyAccessControl(uploadResponse?.data?.cid);

                userConversation.messages.push({
                    authorRole: Roles.User,
                    content: {
                        contentType: ContentType.Text,
                        parts: [request.messageContent, request.chatbotReply],
                        cid: uploadResponse?.data?.cid
                    },
                    id: `${messageId}`,
                    status: Status.Received,
                    timeStamp: request.timeStamp
                });

                await user.save();
            }
        } catch (error: any) {
            throw error;
        }
    }

    private async retrieveAndDecryptMessages(conversation: IConversation) {
        const userMessagesPromises = conversation.messages.map(async (message, index) => {
            if (!message?.content?.cid) {
                throw new Error(`Error: Message at ${index} does not have a valid CID`);
            }
            const decryptedInfo = await decrypt(message.content.cid);

            if (!decryptedInfo) {
                throw new Error(`Error decrypting ${message?.content?.cid}`);
            }

            return decryptedInfo;
        });

        return await Promise.all(userMessagesPromises);
    }

    async getPreviousConversations2(request: Request, response: Response) {
        const { userId } = request.query;

        if (!userId) {
            return response.status(BAD_REQUEST).send({ message: "Invalid UserId" });
        }

        // try {
        //     let user = await User.findById(userId);

        //     if (!user) {
        //         return response.status(NOT_FOUND).send({ message: "User not found" });
        //     }

        //     const userMessages = await this.retrieveAndDecryptMessages(user.conversations[ZERO]);
            
        //     return response.status(OK).send({ user, userMessages });
        // } catch (error) {
        //     return response.status(INTERNAL_SERVER_ERROR).send({ message: "Error retrieving previous conversations" });
        // }

        response.status(OK).send({
            "userId": userId,
            "conversationIds": [
                {
                    "_id": "conversation1",
                    "messages": [
                        {
                            "id": "message1",
                            "authorRole": Roles.User,
                            "content": {
                                "contentType": ContentType.Text,
                                "parts": ["Hello, how are you?", "I'm good. How can I assist you today?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:00:00Z"
                        },
                        {
                            "id": "message3",
                            "authorRole": Roles.User,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["I have a question about my account.", "What would you like to know?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                        {
                            "id": "message4",
                            "authorRole": Roles.System,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["What are intellectual property rights?", "Intellectual property rights are the rights given to persons over the creations of their minds."]
                            },
                            "status": Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                    ]
                }
            ]
        });
    }   
}
