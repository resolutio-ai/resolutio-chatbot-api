import express from "express";
import creatorarmourController from "../controller/creatorarmour.controller";
import { upload } from "../utils/multer.utils";
import { TWO } from "../utils/constants.utils";

const creatorArmorRouter = express.Router();

creatorArmorRouter
    .post("/", upload.array("artWork", TWO), creatorarmourController.createTimeStamp)
    .get("/", creatorarmourController.getCreatedWork)

export default creatorArmorRouter;