"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const conversation_route_1 = __importDefault(require("./conversation.route"));
const creatorarmor_routes_1 = __importDefault(require("./creatorarmor.routes"));
const auth_route_1 = __importDefault(require("./auth.route"));
exports.apiRoutes = (0, express_1.Router)()
    .use((0, express_1.json)())
    .use((0, express_1.urlencoded)({ extended: false }))
    .use("/v1.0/auth", auth_route_1.default)
    .use("/v1.0/conversation", conversation_route_1.default)
    .use("/v1.0/evidence", creatorarmor_routes_1.default);
