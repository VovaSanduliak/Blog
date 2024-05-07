import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Token", tokenSchema);
