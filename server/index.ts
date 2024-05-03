import express from "express";
import cors from "cors";
import startServer from "./src/config/StartServer";
import connectToDb from "./src/config/ConnectToDb";
import router from "./src/router";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

connectToDb();
startServer(app);
