import { Router } from "express";
import userController from "../controller/user.controller";


export default Router()
    .get("/",  userController.getCreatedUser)
    .get("/:walletAddress",  userController.getCreatedUserByWalletAddress)
    .post("/",  userController.addUser)
    .put("/:id",  userController.updateUser)
    .delete("/",  userController.getDelete);




    //route sample : http://localhost:6283/api/v1.0/user

    // http://localhost:6283/api/v1.0/user/walletaddr



   