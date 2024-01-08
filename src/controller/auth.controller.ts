import { Request, Response } from "express";
import { User } from "../models/user.model";
import authService from "../services/auth.service";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "../utils/constants.utils";

class AuthController {
    async authenticate(request: Request, response: Response) {
        const { DIDToken } = request.body;

        if (!DIDToken) {
            return response.status(UNAUTHORIZED).send({ message: "Invalid Token" })
        }

        try {
            const { email, publicAddress } = await authService.validateDIDToken(DIDToken);

            //TODO: Move to User Service
            let user = await User.findById(email);

            if (!user) {
                user = await User.create({
                    _id: email,
                    walletAddress: publicAddress
                });
            }

            return response.status(OK).send({
                message: "success",
                data: {
                    email: email,
                    walletAddress: publicAddress,
                }
            });
            
        } catch (error: any) {
            return response.status(UNAUTHORIZED).send({ message: `${error.message}` })
        }

    }

}

export default new AuthController();