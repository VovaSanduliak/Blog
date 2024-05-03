import userModel from "../models/user-model";

const getAllUsers = async () => {
  return await userModel.find();
};

export default {
  getAllUsers,
};
