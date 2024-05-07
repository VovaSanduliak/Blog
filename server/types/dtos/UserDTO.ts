import { ObjectId } from "mongoose";
import UserRole from "../enums/UserRole";
import IUser from "../interfaces/IUser";

export default class UserDto {
  id: string;
  email: string;
  role: UserRole;
  isActivated: boolean;

  constructor(user: IUser & { _id: ObjectId }) {
    this.id = user._id.toString();
    this.email = user.email;
    this.role = user.role;
    this.isActivated = user.isActivated || false;
  }
}
