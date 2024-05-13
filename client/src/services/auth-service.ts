import { AxiosResponse } from "axios";
import api from "../http";
import IAuthResponse from "../models/response/auth-response";

const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<IAuthResponse>> => {
  return api.post<IAuthResponse>("/auth/login", { email, password });
};

const registration = async (
  nickname: string,
  email: string,
  password: string
): Promise<AxiosResponse<IAuthResponse>> => {
  return api.post<IAuthResponse>("/auth/registration", {
    nickname,
    email,
    password,
  });
};

const logout = async (): Promise<void> => {
  return api.post("/auth/logout");
};

export default {
  login,
  registration,
  logout,
};
