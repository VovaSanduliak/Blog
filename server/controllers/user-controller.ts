import { Request, Response, NextFunction } from "express";
import userService from "../services/user-service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    if (!user || !user.email) {
      throw new Error("Invalid user data");
    }

    const newUser = await userService.createUser(user);
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const userForUpdate = req.body;

    if (!userForUpdate) throw new Error("No user update data provided");

    const updatedUser = await userService.updateUser(id, userForUpdate);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deletedUser = await userService.deleteUser(id);

    if (!deleteUser) throw new Error("User not found");
    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
