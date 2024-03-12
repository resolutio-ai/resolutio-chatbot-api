import { Schema, model } from 'mongoose';
import { IUser } from './interfaces.models';
import { ContentType, Roles, Status } from '../utils/constants.utils';

export const userSchema = new Schema<IUser>({
    userId: { type: String, required: true },
    walletAddress: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }  
});

export const User = model<IUser>("User", userSchema);
