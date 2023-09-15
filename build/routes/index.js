"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
exports.apiRoutes = (0, express_1.Router)()
    .use((0, express_1.json)())
    .use((0, express_1.urlencoded)({ extended: false }))
    .use("/v1.0/conversation", require("./conversation.route"));
