import ApiError from "../exceptions/api-error";
import userModel from "../models/user-model";
import IUser from "../types/interfaces/IUser";

const getAllUsers = async () => {
  return await userModel.find();
};

const getUserById = async (id: string) => {
  const user = await userModel.findById(id);
  if (!user) throw ApiError.BadRequest("User not found");

  return user;
};

const createUser = async (user: IUser) => {
  if ((await userModel.exists({ email: user.email })) && user.email)
    throw ApiError.BadRequest("User with this email already exists");

  return await userModel.create(user);
};

const updateUser = async (id: string, user: IUser) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, user, {
    new: true,
  });

  if (!updateUser) throw ApiError.BadRequest("User not found");

  return updatedUser;
};

const deleteUser = async (id: string) => {
  const user = userModel.findByIdAndDelete(id);
  if (!user) throw ApiError.BadRequest("User not found");

  return user;
};

const isUserWithEmailExists = async (email: string) => {
  if (await userModel.findOne({ email: email })) return true;
  else return false;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserWithEmailExists,
};
