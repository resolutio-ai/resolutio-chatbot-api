"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const creatorarmour_controller_1 = __importDefault(require("../controller/creatorarmour.controller"));
const multer_utils_1 = require("../utils/multer.utils");
const constants_utils_1 = require("../utils/constants.utils");
const creatorArmorRouter = express_1.default.Router();
creatorArmorRouter
    .post("/", multer_utils_1.upload.array("artWork", constants_utils_1.TWO), creatorarmour_controller_1.default.createTimeStamp)
    .get("/", creatorarmour_controller_1.default.getCreatedWork);
exports.default = creatorArmorRouter;
