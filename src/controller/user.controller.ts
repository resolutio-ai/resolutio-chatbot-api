import { Request, Response } from "express";
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK, CREATED ,SocialMediaType, BAD_REQUEST } from "../utils/constants.utils";
import userService from "../services/user.service";
import { ISocialMediaURLS, IUser } from "../models/interfaces.models";
import { ICreatorWorkMetadata } from "../models/interfaces.models";
import { forEachChild } from "typescript";


class UserController {

    // get all the users
    getAllUsers = async (request: Request, response: Response) => {
        try {
            const users = await userService.getUser();
            if (!users || users.length < 1) {
                return response.status(NOT_FOUND).send({
                    message: `No User found`
                });
            }

            return response.status(OK).send({
                data: users, 
                message: "Users retrieved successfully"
            })
            
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({
                message: `An Error Ocurred: \n${error.message}`
            });
        }
    };

    getUserByWalletAddress = async (request: Request, response: Response) => {
        const { walletAddress } = request.params;
        try {
            const user = await userService.getUserByWalletAddress(walletAddress as string);
            if (!user) {
                return response.status(NOT_FOUND).send({
                    message: `User not found`
                });
            }
            return response.status(OK).send({
                data: user, 
                message: "User retrieved successfully"
            });
        
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({
                message: `An Error Ocurred: \n${error.message}`
            });
        }
    };

    addUser = async (request: Request, response: Response) => {
        try {
            const userData: IUser = request.body;

            if (userData.socialMediaURLs && userData.socialMediaURLs.length > 0){
                let validURL = validateSocialMediaURLs(userData.socialMediaURLs);
                if (!validURL){
                    return response.status(BAD_REQUEST).send({ message: "INVALID SOCIAL MEDIA TYPE" });
                }    
            }
            
            const user = await userService.addMainUser(userData);
            return response.status(CREATED).send({ 
                data: user,
                message: "User created successfully" 
            });
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({ error: error.message });
        }
    }
     

    updateUser = async (request: Request, response: Response) => {
        try {
            const {userId} = request.params;
            const userData: IUser = request.body;
            const user = await userService.updateUserById(userId, userData);
            if (!user) {
                return response.status(NOT_FOUND).send({
                    message: `User not found`
                });
            }
            return response.status(OK).send({ 
                data : user,
                message: `updated successfully`
            });
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({ error: error.message });
        }
    }
}

function validateSocialMediaURLs(socialMediaURLs: ISocialMediaURLS[]): boolean {
    for (const obj of socialMediaURLs){
        switch (obj.nameOfSocialMedia) {
            case SocialMediaType[0]:
                console.log('here', obj.nameOfSocialMedia);
                if (!obj.URLvalue.startsWith("https://twitter.com/")){
                    return false;
                }
                break;
            case SocialMediaType[1]:
                if (!obj.URLvalue.startsWith("https://www.behance.net/")){
                    return false;
                }
                break;
            case SocialMediaType[2]:
                if (!obj.URLvalue.startsWith("https://www.instagram.com/")){
                    return false;
                }
                break;
        }
            
    }
    return true;
}
            /*
            switch (socialMediaURL.nameOfSocialMedia) {
                case SocialMediaType.Twitter:
                    if (!socialMediaURL.URLvalue.startsWith("https://twitter.com/")){
                        return false;
                    }
                    break;
                case SocialMediaType.Behance:
                    if (!socialMediaURL.URLvalue.startsWith("https://www.behance.net/")){
                        return false;
                    }
                    break;
                case SocialMediaType.Instagram:
                    if (!socialMediaURL.URLvalue.startsWith("https://www.instagram.com/")){
                        return false;
                    }
                    break;
            }
            */

export default new UserController();
