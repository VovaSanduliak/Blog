import mongoose, { Schema, ObjectId } from "mongoose";
import UserRole from "../enums/UserRole";

interface IUser {
  email: string;
  role: UserRole;
  password: string;
  isActivated?: boolean;
  activationLink?: string;
}

export default IUser;
