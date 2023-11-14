"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const constants_utils_1 = require("./constants.utils");
const multerStorage = multer_1.default.diskStorage({
    destination: (_, __, callBack) => {
        callBack(null, "public");
    },
    filename: (_, file, callBack) => {
        const ext = file.mimetype.split("/")[constants_utils_1.ONE];
        callBack(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    }
});
const multerFilter = (req, file, callBack) => {
    if (constants_utils_1.allowedImageExtensions.includes(file.mimetype.split("/")[constants_utils_1.ONE])) {
        callBack(null, true);
    }
    else {
        callBack(new Error("Invalid File Type!!"), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage: multerStorage,
    // fileFilter: multerFilter
});
