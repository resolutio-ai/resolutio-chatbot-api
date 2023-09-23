import { Schema, model } from 'mongoose';
import { IUser } from './interfaces.models';
import { ContentType, Roles, Status } from '../utils/constants.utils';

export const userSchema = new Schema<IUser>({
    userId: { type: String, required: true },
    conversations: {
        type: [{
            _id: { type: String },
            messages: [
                {
                    id: { type: Schema.Types.ObjectId },
                    authorRole: { type: String, enum: Roles, required: true },
                    content: {
                        contentType: { type: String, enum: ContentType, required: true },
                        parts: [String],
                        cid: String
                    },
                    status: { type: String, enum: Status, required: true },
                    timestamp: Date
                },
            ]
        }], required: false
    }
});

export const User = model<IUser>("User", userSchema);
