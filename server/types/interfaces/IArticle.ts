import mongoose from "mongoose";
import IComment from "./IComment";

interface IArticle extends Document {
  authorID: mongoose.Schema.Types.ObjectId;
  title: string;
  categoryID: mongoose.Schema.Types.ObjectId;
  content: string;
  comments: IComment[];
  cratedAt: Date;
  updatedAt: Date;
}

export default IArticle;
