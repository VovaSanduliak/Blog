import mongoose from "mongoose";

interface IComment extends Document {
  authorID: mongoose.Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export default IComment;
