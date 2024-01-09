import multer from "multer";
import { ONE, allowedImageExtensions } from "./constants.utils";
import { Request } from "express";

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, callBack: Function) => {
    if (allowedImageExtensions.includes(file.mimetype.split("/")[ONE])) {
        callBack(null, true);
    } else {
        callBack(new Error("Invalid File Type!!"), false);
    }
}

export const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter
})