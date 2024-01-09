import express from "express";
import cors from "cors";
import { apiRoutes } from "./routes";
import { corsOptions } from "./utils/constants.utils";
import { PORT } from "./config/env.config";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/database.config";

const app = express();

connectDatabase();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    }));

app.use(cors(corsOptions));

app.get("/", async (_, res) => {
    res.status(200).send("Welcome to Resolutio API :)");
});

app.use("/api", apiRoutes);
app.all("*", (_, res) =>
    res.status(404).send({ message: "route not found" })
);

//app.use(errorHandler);
//(async () => console.log(await getApiKey(), "API- KEY"))();

app.listen(PORT || 3000, () => {
    console.log(
        `Server running\nListening on port:${PORT}`
    );
});
