import { Request, Response } from "express";
import authService from "../services/auth.service";
import { OK, UNAUTHORIZED } from "../utils/constants.utils";
import userService from "../services/user.service";

class AuthController {
    async authenticate(request: Request, response: Response) {
        const { DIDToken } = request.body;

        if (!DIDToken) {
            return response.status(UNAUTHORIZED).send({ message: "Invalid Token" })
        }

        try {
            const { email, publicAddress } = await authService.validateDIDToken(DIDToken);

            if (!await userService.getUserByEmail(email)) {
                userService.addUser({ email, publicAddress });
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