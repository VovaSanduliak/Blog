import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import startServer from "./src/config/StartServer";
import connectToDb from "./src/config/ConnectToDb";
import router from "./src/router";
import errorMiddleware from "./middleware/error-middleware";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(errorMiddleware);

connectToDb();
startServer(app);
