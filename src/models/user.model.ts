import { Schema, model } from 'mongoose';
import { IUser } from './interfaces.models';
import { Medium, LicenseType, SocialMediaType} from '../utils/constants.utils';

export const userSchema = new Schema<IUser>({
    //userId: { type: String, required: true },
    walletAddress: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        required: true,
    },
    professionalTitle: {
        type: String,
        required: true,
    },
    socialMediaURLs:  [
        { type: [{
            nameOfSocialMedia: { type: String, enum: SocialMediaType, required: true  },
            URLvalue: { type: String ,required: true},
        }] 
    }],
    works: [{ 
        type:[{
            creatorId: { type: String ,required: true},
            nameOfWork: { type: String ,required: true},
            dateOfCreation: { type: Date ,required: true},
            medium: {type: String, required: true  },
            alternativeMedium: { type: String },
            licenseType: {type: String, required: true  },

        }]
     }],
    
});

export const User = model<IUser>("User", userSchema);
