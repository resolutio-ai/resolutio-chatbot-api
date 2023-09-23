"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
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
                        authorRole: { type: String, enum: constants_utils_1.Roles, required: true },
                        content: {
                            contentType: { type: String, enum: constants_utils_1.ContentType, required: true },
                            parts: [String],
                            cid: String
                        },
                        status: { type: String, enum: constants_utils_1.Status, required: true },
                        timestamp: Date
                    },
                ]
            }], required: false
    }
});
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
