import dotenv from "dotenv";
import { Application } from "express";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = (app: Application) => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(`Starting server error: ${err}`);
  }
};

export default startServer;
