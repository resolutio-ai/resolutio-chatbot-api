import { Router } from "express";
import creatorarmourController from "../controller/creatorarmour.controller";
import { upload } from "../utils/multer.utils";
import { ONE, TWO } from "../utils/constants.utils";

export default Router()
    .post("/", upload.fields([{name:"userworks", maxCount: ONE}, {name:"userpersonalizedlicense", maxCount: ONE}]), creatorarmourController.createTimeStamp)
    .get("/", creatorarmourController.getCreatedWork);
