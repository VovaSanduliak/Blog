import express from "express";
import startServer from "./src/config/StartServer";
import connectToDb from "./src/config/ConnectToDb";

const app = express();

app.use(express.json());

connectToDb();
startServer();
