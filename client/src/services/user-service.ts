import { AxiosResponse } from "axios";
import api from "../http";
import IUser from "../models/IUser";

const getAllUsers = async (): Promise<AxiosResponse<IUser[]>> => {
  return api.get<IUser[]>("/users");
};

export default {
  getAllUsers,
};
