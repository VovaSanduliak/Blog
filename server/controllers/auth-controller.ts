import { Request, Response, NextFunction } from "express";
import authService from "../services/auth-service";
import { Result, ValidationError, validationResult } from "express-validator";
import ApiError from "../exceptions/api-error";

const oneMonthInMiliseconds = 30 * 24 * 60 * 60 * 1000;

const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("registration");
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array();
      return next(ApiError.BadRequest("Validation error:", validationErrors));
    }

    const { email, password } = req.body;
    const userData = await authService.registration(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: oneMonthInMiliseconds,
      httpOnly: true,
    });

    res.json(userData);
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.login(email, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: oneMonthInMiliseconds,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.json(token);
  } catch (err) {
    next(err);
  }
};

export default {
  registration,
  login,
  logout,
};
