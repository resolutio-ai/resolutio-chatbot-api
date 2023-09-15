import { ContentType, Roles, Status } from "../utils/constants.utils";
import { Request, Response } from "express";

export class ConversationController {
    getPreviousConversations(request: Request, response: Response) {
        const { userId } = request.query;

        if (!userId) {
            response.status(400).send({ message: "Invalid UserId" })
        }

        response.status(200).send({
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
                                "parts": ["Hello, how are you?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:00:00Z"
                        },
                        {
                            "id": "message2",
                            "authorRole": Roles.System,
                            "content": {
                                "contentType": ContentType.Text,
                                "parts": ["I'm good. How can I assist you today?"]
                            },
                            "status": Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                        {
                            "id": "message3",
                            "authorRole": Roles.User,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["I have a question about my account."]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                        {
                            "id": "message4",
                            "authorRole": Roles.System,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["What would you like to know?"]
                            },
                            "status": Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                    ]
                },
                {
                    "_id": "conversation2",
                    "messages": [
                        {
                            "id": "message1",
                            "authorRole": Roles.User,
                            "content": {
                                "contentType": ContentType.Text,
                                "parts": ["What is IP rights?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:00:00Z"
                        },
                        {
                            "id": "message2",
                            "authorRole": Roles.System,
                            "content": {
                                "contentType": ContentType.Text,
                                "parts": ["Intellectual property rights are the rights given to persons over the creations of their minds."]
                            },
                            "status": Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                        {
                            "id": "message3",
                            "authorRole": Roles.User,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["Awesome. What are some of mine?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                        {
                            "id": "message4",
                            "authorRole": Roles.System,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["Patents, trademarks, copyrights, and trade secrets are valuable assets of the company and understanding how they work and how they are created is critical to knowing how to protect them"]
                            },
                            "status": Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                    ]
                },
            ]
        });

    }

    sendUserMessage(request: Request, response: Response) {

        const { userId, messageContent, conversationId, timeStamp, isLoggedIn, authorRole } = request.body

        //TODO
        //send data to chat API
        //retrieve response
        //if user is logged in
        //Get a user where the Id == USerId
        //If user does not exist create one
        //Get a conversation where request.conversation.Id == user.conversation.id
        //If conversation exists then add message to the user.conversation.messages
        //If conversation does not exist, then create a new conversation

        if (isLoggedIn) {
            response.status(200).send({
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
                                    "parts": ["Hello, how are you?"]
                                },
                                "status": Status.Sent,
                                "timestamp": "2023-09-11T12:00:00Z"
                            },
                            {
                                "id": "message2",
                                "authorRole": Roles.System,
                                "content": {
                                    "contentType": ContentType.Text,
                                    "parts": ["I'm good. How can I assist you today?"]
                                },
                                "status": Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message3",
                                "authorRole": Roles.User,
                                "content": {
                                    "content_type": ContentType.Text,
                                    "parts": ["I have a question about my account."]
                                },
                                "status": Status.Sent,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message4",
                                "authorRole": Roles.System,
                                "content": {
                                    "content_type": ContentType.Text,
                                    "parts": ["What would you like to know?"]
                                },
                                "status": Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                        ]
                    },
                    {
                        "_id": "conversation2",
                        "messages": [
                            {
                                "id": "message1",
                                "authorRole": Roles.User,
                                "content": {
                                    "contentType": ContentType.Text,
                                    "parts": ["What is IP rights?"]
                                },
                                "status": Status.Sent,
                                "timestamp": "2023-09-11T12:00:00Z"
                            },
                            {
                                "id": "message2",
                                "authorRole": Roles.System,
                                "content": {
                                    "contentType": ContentType.Text,
                                    "parts": ["Intellectual property rights are the rights given to persons over the creations of their minds."]
                                },
                                "status": Status.Received,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message3",
                                "authorRole": Roles.User,
                                "content": {
                                    "content_type": ContentType.Text,
                                    "parts": ["Awesome. What are some of mine?"]
                                },
                                "status": Status.Sent,
                                "timestamp": "2023-09-11T12:10:00Z"
                            },
                            {
                                "id": "message4",
                                "authorRole": Roles.System,
                                "content": {
                                    "content_type": ContentType.Text,
                                    "parts": ["Patents, trademarks, copyrights, and trade secrets are valuable assets of the company and understanding how they work and how they are created is critical to knowing how to protect them"]
                                },
                                "status": Status.Received,
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
                            "authorRole": Roles.User,
                            "content": {
                                "contentType": ContentType.Text,
                                "parts": ["What is IP rights?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:00:00Z"
                        },
                        {
                            "id": "message2",
                            "authorRole": Roles.System,
                            "content": {
                                "contentType": ContentType.Text,
                                "parts": ["Intellectual property rights are the rights given to persons over the creations of their minds."]
                            },
                            "status": Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        }
                    ]
                },
            ]
        });


    }
}