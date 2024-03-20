import { Request, Response } from "express";
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK, CREATED } from "../utils/constants.utils";
import userService from "../services/user.service";
import { IUser } from "../models/interfaces.models";

class UserController{

    // get all the users
    getCreatedUser = async (request: Request, response: Response) => {
        try {
            const users = await userService.getUser();
            if (users){
                return response.status(OK).send(users);
            }
            else{
                return response.status(NOT_FOUND).send({
                    message: `User not found`
                });
            }
        } catch (error : any) {
            return response.status(NOT_FOUND).send({
                message: `An Error Ocurred: \n${error.message}`
            });
        }
    };

    getCreatedUserByWalletAddress = async (request: Request, response: Response) => {
        const { walletAddress } = request.params;
        try {
            const users = await userService.getUserByWalletAddress(walletAddress as string);
            if (users){
                return response.status(OK).send(users);
            }
            else{
                return response.status(NOT_FOUND).send({
                    message: `User not found`
                });
            }
        } catch (error : any) {
            return response.status(INTERNAL_SERVER_ERROR).send({
                message: `An Error Ocurred: \n${error.message}`
            });
        }
    };

    async addUser(request: Request, response: Response) {
        try {
            const userData: IUser = request.body;
            await userService.addMainUser(userData);
            return response.status(CREATED).send({ message: "User created successfully" });
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({ error: error.message });
        }
    }
    
}

export default new UserController();