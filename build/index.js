"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_config_1 = require("./config/database.config");
const routes_1 = require("./routes");
const constants_utils_1 = require("./utils/constants.utils");
const env_config_1 = require("./config/env.config");
const app = (0, express_1.default)();
(0, database_config_1.connectDatabase)();
app.use((0, cors_1.default)(constants_utils_1.corsOptions));
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Welcome to Resolutio Chatbot :)");
}));
app.use("/api", routes_1.apiRoutes);
app.all("*", (_, res) => res.status(404).send({ message: "route not found" }));
//app.use(errorHandler);
//(async () => console.log(await getApiKey(), "API- KEY"))();
app.listen(env_config_1.PORT || 3000, () => {
    console.log(`Server running\nListening on port:${env_config_1.PORT}`);
});
