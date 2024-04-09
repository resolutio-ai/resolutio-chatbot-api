import { Router } from "express";
import userController from "../controller/user.controller";


export default Router()
    .get("/",  userController.getAllUsers)
    .get("/:walletAddress",  userController.getUserByWalletAddress)
    .post("/",  userController.addUser)
    .put("/:id",  userController.updateUser);


   