import { Router, json, urlencoded } from "express";

export const apiRoutes =  Router()
    .use(json())
    .use(urlencoded({ extended: false }))
    .use("/v1.0/conversation", require("./conversation.route"));