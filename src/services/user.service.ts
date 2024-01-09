import { User } from "../models/user.model"

interface CreateUserSchema {
    email: string,
    publicAddress: string
}

class UserService {
    addUser = async (createUserSchema: CreateUserSchema) =>
        await User.create({
            _id: createUserSchema.email,
            walletAddress: createUserSchema.publicAddress
        });

    getUserByEmail = async (email: string) =>
        await User.findById(email);

}

export default new UserService();