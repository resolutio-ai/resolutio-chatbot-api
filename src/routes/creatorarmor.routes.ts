import { Router } from "express";
import creatorarmourController from "../controller/creatorarmour.controller";
import { upload } from "../utils/multer.utils";
import { TWO } from "../utils/constants.utils";

export default Router()
    .post("/", upload.array("artWork", TWO), creatorarmourController.createTimeStamp)
    .get("/", creatorarmourController.getCreatedWork);
