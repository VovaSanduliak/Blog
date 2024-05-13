import mongoose from "mongoose";
import IArticle from "../types/interfaces/IArticle";
import { commentSchema } from "./comment-model";

const articleSchema = new mongoose.Schema<IArticle>(
  {
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
