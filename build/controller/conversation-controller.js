"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const constants_utils_1 = require("../utils/constants.utils");
class ConversationController {
    getPreviousConversations(request, response) {
        const { userId } = request.query;
        if (!userId) {
            response.status(400).send({ message: "Invalid UserId" });
        }
        response.status(200).send({
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
                            "authorRole": constants_utils_1.Roles.System,
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
                            "authorRole": constants_utils_1.Roles.System,
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
                            "authorRole": constants_utils_1.Roles.System,
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
                            "authorRole": constants_utils_1.Roles.System,
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
    }
    sendUserMessage(request, response) {
        const { userId, messageContent, conversationId, timeStamp, isLoggedIn, authorRole } = request.body;
        //TODO
        //send data to chat API
        //retrieve response
        //if user is logged in
        //Get a user where the Id == USerId
        //If user does not exist create one
        //Get a conversation where request.conversation.Id == user.conversation.id
        //If conversation exists then add message to the user.conversation.messages
        //If conversation does not exist, then create a new conversation
        if (request === null || request === void 0 ? void 0 : request.isLoggedIn) {
            response.status(200).send({
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
                                "authorRole": constants_utils_1.Roles.System,
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
                                "authorRole": constants_utils_1.Roles.System,
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
                                "authorRole": constants_utils_1.Roles.System,
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
                                "authorRole": constants_utils_1.Roles.System,
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
        }
        return response.status(200).send({
            "userId": userId,
            "conversationIds": [
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
                            "authorRole": constants_utils_1.Roles.System,
                            "content": {
                                "contentType": constants_utils_1.ContentType.Text,
                                "parts": ["Intellectual property rights are the rights given to persons over the creations of their minds."]
                            },
                            "status": constants_utils_1.Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        }
                    ]
                },
            ]
        });
    }
}
exports.ConversationController = ConversationController;
