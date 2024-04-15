import { Request, Response } from "express";
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK, CREATED, SocialMediaType, BAD_REQUEST, ONE, ZERO } from "../utils/constants.utils";
import userService from "../services/user.service";
import { ISocialMediaURLS, IUser } from "../models/interfaces.models";

class UserController {

    getAllUsers = async (request: Request, response: Response) => {
        try {
            const users = await userService.getUsers();
            if (!users || users.length < ONE) {
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
        if(!walletAddress) {
            return response.status(BAD_REQUEST).send({ message: "Provide wallet address in request" });
        }
        try {
            const user = await userService.getUserByWalletAddr(walletAddress as string);
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

    checkSocialMediaURLs = async (request : IUser, response: Response) => {
        try {
            const userData: IUser = request;
            if (userData.socialMediaURLs && userData.socialMediaURLs.length > ZERO) {
                let validURL = validateSocialMediaURLs(userData.socialMediaURLs);
                if (!validURL) {
                    return response.status(BAD_REQUEST).send({ message: "The given social media URL is inavlid" });
                }
            }
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({ error: error.message });
        }
    }

    addUser = async (request: Request, response: Response) => {
        try {
            const userData: IUser = request.body;

            const walletAddress = userData.walletAddress;
            const checkUser = await userService.getUserByWalletAddr(walletAddress as string);
            if (checkUser){
                return response.status(BAD_REQUEST).send({ message: "User with given wallet address exists." });
            }

            await this.checkSocialMediaURLs(userData,response);

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
            const { id } = request.params;
            if(!id) {
                return response.status(BAD_REQUEST).send({ message: "Please provide a valid user id in request" });
            }
            const orgUser = await userService.getUserById(id);
            if(!orgUser) {
                return response.status(NOT_FOUND).send({ message: "User not found" });
            }
            const userData: IUser = request.body;
            
            if (userData.walletAddress){
                return response.status(BAD_REQUEST).send({ message: "The wallet address cannot be updated" });
            }
            
            await this.checkSocialMediaURLs(userData,response);

            if (orgUser.socialMediaURLs && orgUser.socialMediaURLs.length > ZERO && 
                userData.socialMediaURLs && userData.socialMediaURLs.length > ZERO){
                    for (const obj of orgUser.socialMediaURLs) {
                        const updationRequired = userData.socialMediaURLs.some(url => url.nameOfSocialMedia === obj.nameOfSocialMedia)
                        if(!updationRequired){
                            userData.socialMediaURLs.push(obj);
                        }
                    }
            }
            
            
            const user = await userService.updateUserById(id, userData);

            return response.status(OK).send({
                data: user,
                message: `updated successfully`
            });
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({ error: error.message });
        }
    }
}


function validateSocialMediaURLs(socialMediaURLs: ISocialMediaURLS[]): boolean {
    for (const obj of socialMediaURLs) {
        switch (obj.nameOfSocialMedia) {
            case SocialMediaType[0]:
                if (!obj.URLvalue.startsWith("https://twitter.com/")) {
                    return false;
                }
                break;
            case SocialMediaType[1]:
                if (!obj.URLvalue.startsWith("https://www.behance.net/")) {
                    return false;
                }
                break;
            case SocialMediaType[2]:
                if (!obj.URLvalue.startsWith("https://www.instagram.com/")) {
                    return false;
                }
                break;
        }

    }
    return true;
}

export default new UserController();
