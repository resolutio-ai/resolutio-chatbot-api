import { Router } from "express";
import userController from "../controller/user.controller";


export default Router()
    .get("/:id/:creatorid",  userController.getCreatedWork);

