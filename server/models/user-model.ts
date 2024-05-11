import mongoose from "mongoose";
import UserRole from "../types/enums/UserRole";
import IUser from "../types/interfaces/IUser";

const userSchema = new mongoose.Schema<IUser>({
  nickname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.Basic,
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
