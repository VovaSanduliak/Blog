import { Request, Response, NextFunction } from "express";
import userService from "../services/user-service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getAllUsers,
};
