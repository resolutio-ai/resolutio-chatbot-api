"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_utils_1 = require("../utils/constants.utils");
exports.userSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    conversations: {
        type: [{
                _id: { type: String },
                messages: [
                    {
                        id: { type: mongoose_1.Schema.Types.ObjectId },
                        authorRole: { type: constants_utils_1.Roles, required: true },
                        content: {
                            content_type: { type: constants_utils_1.ContentType, required: true },
                            parts: [String]
                        },
                        status: { type: constants_utils_1.Status, required: true },
                        timestamp: String
                    },
                ]
            }], required: false
    }
});
//export const userModel = model("User", userSchema);
