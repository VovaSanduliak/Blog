import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import tokenModel from "../models/token-model";
import { Schema } from "mongoose";
dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const generateTokens = (payload: string | object) => {
  if (!accessSecret) throw new Error("Access secret key is not provided");
  if (!refreshSecret) throw new Error("Refresh secret key is not provided");

  const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "30min" });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "30d" });

  return {
    accessToken,
    refreshToken,
  };
};

const validateAccessToken = (token: string) => {
  if (!accessSecret) throw new Error("Access secret key is not provided");

  try {
    const userData = jwt.verify(token, accessSecret);
    return userData;
  } catch (err) {
    return null;
  }
};

const validateRefreshToken = (token: string) => {
  if (!refreshSecret) throw new Error("Refresh secret key is not provided");

  try {
    const userData = jwt.verify(token, refreshSecret);
    return userData;
  } catch (err) {
    return null;
  }
};

const saveToken = async (
  userId: Schema.Types.ObjectId | string,
  refreshToken: string
) => {
  const tokenData = await tokenModel.findOne({ userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  } else {
    const token = await tokenModel.create({ userId, refreshToken });
    return token;
  }
};

const findToken = async (refreshToken: string) => {
  const tokenData = await tokenModel.findOne({ refreshToken });
  return tokenData;
};

const removeToken = async (refreshToken: string) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken });
  return tokenData;
};

export default {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  saveToken,
  findToken,
  removeToken,
};
