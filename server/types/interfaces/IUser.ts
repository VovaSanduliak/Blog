interface IUser {
  email: string;
  password: string;
  isActivated?: boolean;
  activationLink?: string;
}

export default IUser;
