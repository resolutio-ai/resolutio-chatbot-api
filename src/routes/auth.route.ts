import express from "express";
import AuthService from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", AuthService.authenticate);

export default authRouter;