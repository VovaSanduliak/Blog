import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    default: new mongoose.Types.ObjectId(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
