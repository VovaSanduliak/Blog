import express from "express";
import startServer from "./src/config/StartServer";

const app = express();

app.use(express.json());

startServer();
