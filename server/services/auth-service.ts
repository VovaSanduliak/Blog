import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../exceptions/api-error";
import userService from "./user-service";
import mailService from "./mail-service";
import tokenService from "./token-service";
import UserRole from "../types/enums/UserRole";
import userModel from "../models/user-model";
import UserDto from "../types/dtos/UserDTO";
import { JwtPayload } from "jsonwebtoken";

const registration = async (email: string, password: string) => {
  const userWithEmailExists = await userService.isUserWithEmailExists(email);

  if (userWithEmailExists)
    throw ApiError.BadRequest(`User with email ${email} already exists`);

  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuidv4();

  const user = await userService.createUser({
    email,
    password: hashPassword,
    activationLink,
    role: UserRole.Basic,
  });

  await mailService.sendActivationMail(
    email,
    `${process.env.API_URL}/auth/activate/${activationLink}`
  );

  const userDto = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    isActivated: user.isActivated,
  };

  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

const activate = async (activationLink: string) => {
  const user = await userModel.findOne({ activationLink });

  if (!user) throw ApiError.BadRequest("Incorrect activation link");

  user.isActivated = true;
  await user.save();
};

const login = async (email: string, password: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw ApiError.BadRequest(`User with email ${email} not found`);

  const isPasswordsEquals = await bcrypt.compare(password, user.password);
  if (!isPasswordsEquals) throw ApiError.BadRequest("Incorrect password");

  const userDto = new UserDto({ ...user, _id: user.id });
  const tokens = tokenService.generateTokens({ ...userDto });

  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
};

const logout = async (refreshToken: string) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw ApiError.UnathorizedError();

  const userData = tokenService.validateRefreshToken(
    refreshToken
  ) as JwtPayload;
  const tokenFromDb = await tokenService.findToken(refreshToken);

  if (!userData || !tokenFromDb) throw ApiError.UnathorizedError();

  const user = await userModel.findById(userData.id);

  if (!user) throw ApiError.BadRequest("user not found");

  const userDto = new UserDto({ ...user, _id: user.id });
  const tokens = tokenService.generateTokens({ ...userDto });

  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
};

export default {
  registration,
  activate,
  login,
  logout,
  refresh,
};
