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
            await userService.addMainUser(userData);
            return response.status(CREATED).send({ message: "User created successfully" });
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

export default new UserController();
