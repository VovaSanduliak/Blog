import UserRole from "../enums/UserRole";

interface IUser {
  nickname: string;
  email: string;
  role: UserRole;
  password: string;
  isActivated?: boolean;
  activationLink?: string;
}

export default IUser;
