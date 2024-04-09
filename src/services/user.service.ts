import { User } from "../models/user.model"
import { IUser } from "../models/interfaces.models"
import mongoose from "mongoose"
import { updateLanguageServiceSourceFile } from "typescript";

interface CreateUserSchema {
    email: string,
    publicAddress: string
}

class UserService {
    // function already defined in code used for authentication
    addUser = async (createUserSchema: CreateUserSchema) =>
        await User.create({
            _id: createUserSchema.email,
            walletAddress: createUserSchema.publicAddress
       });
    
    // function to add full profile of user
    addMainUser = async (userData: IUser) =>
       {
        const { walletAddress, firstName, lastName, bio,profileImg, professionalTitle, socialMediaURLs } = userData;
        const user = await User.create({
            walletAddress: walletAddress,
            firstName : firstName,
            lastName : lastName,
            bio : bio,
            profileImg : profileImg,
            professionalTitle : professionalTitle,
            socialMediaURLs : socialMediaURLs
        });
        return user;
    }

    getUserByEmail = async (email: string) =>
        await User.findById(email);
    
    getUsers = async () =>
        await User.find({});

    getUserByWalletAddr = async (walletAddress: string) =>
        await User.findOne({walletAddress});

    updateUserById = async(userId: string, userData: IUser): Promise<IUser | null> => {
    
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: userData }, {new: true} );
        return updatedUser;
            
    }
            
}

export default new UserService();