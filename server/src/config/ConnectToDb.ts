import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DB_URL;

const addListeners = () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

const connectToDb = async () => {
  try {
    if (!connectionString) {
      throw new Error("DB_URL is not set");
    }

    await mongoose.connect(connectionString);

    console.log("MongoDB connection has been started");
    addListeners();
  } catch (err) {
    console.log("Error connection to MongoDB", err);
  }
};

export default connectToDb;
