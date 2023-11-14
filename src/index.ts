import express from "express";
import cors from "cors"
import { connectDatabase } from "./config/database.config";
import { apiRoutes } from "./routes";
import { corsOptions } from "./utils/constants.utils";
import { getApiKey } from "./integrations/lighthouse/apikey";
import { PORT } from "./config/env.config";

const app = express();

//connectDatabase();

app.use(cors(corsOptions));

app.get("/", async (_, res) => {
    res.status(200).send("Welcome to Resolutio Chatbot :)");
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
