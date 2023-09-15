import { Schema } from 'mongoose';
import { IUser } from './interfaces.models';
import { ContentType, Roles, Status } from '../utils/constants.utils';

export const userSchema = new Schema<IUser>({
    userId: { type: String, required: true },
    conversations: {
        type: [{
            _id: { type: String },
            messages: [
                {
                    id: { type: Schema.Types.ObjectId, ref: 'Message' },
                    authorRole: { type: Roles, required: true },
                    content: {
                        content_type: { type: ContentType, required: true },
                        parts: [String]
                    },
                    status: { type: Status, required: true },
                    timestamp: String
                },
            ]
        }], required: false
    }
});

