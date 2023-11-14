import multer from "multer";
import { ONE, allowedImageExtensions } from "./constants.utils";
import { Request } from "express";

const multerStorage = multer.diskStorage({
    destination: (_, __, callBack) => {
        callBack(null, "public");
    },
    filename: (_, file, callBack) => {
        const ext = file.mimetype.split("/")[ONE];
        callBack(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    }
});

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