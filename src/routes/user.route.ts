import { Router } from "express";
import userController from "../controller/user.controller";


export default Router()
    .get("/",  userController.getAllUsers)
    .get("/:walletAddress",  userController.getUserByWalletAddress)
    .post("/",  userController.addUser)
    .put("/:id",  userController.updateUser);




    //route sample : http://localhost:6283/api/v1.0/user

    // http://localhost:6283/api/v1.0/user/walletaddr



   