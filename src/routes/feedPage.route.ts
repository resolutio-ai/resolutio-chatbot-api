import { Router } from "express";
import { upload } from "../utils/multer.utils";
import { ONE, TWO } from "../utils/constants.utils";
import feedpageController from "../controller/feedPage.controller";

export default Router()
    //.get("/", feedpageController.allWorks)
    .get("/", feedpageController.paginatedWorks);