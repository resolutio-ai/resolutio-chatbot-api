"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadArtWorkSchema = exports.sendChatRequestSchema = void 0;
const yup_1 = require("yup");
exports.sendChatRequestSchema = (0, yup_1.object)().shape({
    userId: (0, yup_1.string)(),
    messageContent: (0, yup_1.string)().required("Users message is required"),
    timeStamp: (0, yup_1.string)().required("timeStamp is required"),
    isLoggedIn: (0, yup_1.bool)().required("User's log in status is required")
});
exports.uploadArtWorkSchema = (0, yup_1.object)({
    creatorName: (0, yup_1.string)().required(""),
    workName: (0, yup_1.string)().required(),
    dateOfCreation: (0, yup_1.date)().required(""),
    specificMedium: (0, yup_1.string)(),
    medium: (0, yup_1.string)().required(),
    contactFile: (0, yup_1.string)().required()
});
