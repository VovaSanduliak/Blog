import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // articleID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Article",
    //   required: true,
    // },
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model("Comment", commentSchema);
