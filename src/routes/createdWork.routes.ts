import { Router } from "express";
import createdWorkController from "../controller/createdWork.controller";
import { upload } from "../utils/multer.utils";
import { ONE, TWO } from "../utils/constants.utils";

export default Router()
    .post("/", createdWorkController.createTimeStamp)
    .get("/cid", createdWorkController.getCreatedWork)
    .get("/", createdWorkController.getAllWorksByUser);
