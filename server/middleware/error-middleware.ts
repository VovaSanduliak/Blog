import { ErrorRequestHandler, Request, Response } from "express";
import ApiError from "../exceptions/api-error";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  } else {
    return res.status(500).json({
      message: "Internal Server Error: " + err.message,
      errors: err.stack,
    });
  }
};

export default errorMiddleware;
