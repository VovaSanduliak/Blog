import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import startServer from "./src/config/StartServer";
import connectToDb from "./src/config/ConnectToDb";
import { connectToNeo4j } from "./src/config/ConnectToNeo4j";
import router from "./src/router";
import errorMiddleware from "./middleware/error-middleware";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", router);
app.use(errorMiddleware);

connectToDb();
connectToNeo4j();
startServer(app);
