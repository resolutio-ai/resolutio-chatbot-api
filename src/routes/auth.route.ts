import { Router } from "express";
import authController from "../controller/auth.controller";

export default Router()
    .post("/login", authController.authenticate);
