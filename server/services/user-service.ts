import userModel from "../models/user-model";
import IUser from "../types/interfaces/IUser";

const getAllUsers = async () => {
  return await userModel.find();
};

const getUserById = async (id: string) => {
  const user = await userModel.findById(id);
  if (!user) throw new Error("User not found");

  return user;
};

const createUser = async (user: IUser) => {
  if (await userModel.findOne({ email: user.email }))
    throw new Error("User with this email already exists");

  return await userModel.create(user);
};

const updateUser = async (id: string, user: IUser) => {
  await userModel.findByIdAndUpdate(id, user);
  return user;
};

const deleteUser = async (id: string) => {
  const user = userModel.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");

  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
