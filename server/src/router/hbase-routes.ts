import express, { Request, Response, NextFunction } from "express";
import { addUserAction, getUserActionsByTimeRange } from "../config/HBase";
const router = express.Router();

router.post(
  "/user-action",
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      user_id,
      action_type,
      action_details,
      timestamp,
      session_id,
      device_info,
      location_info,
      browser_info,
    } = req.body;
    try {
      await addUserAction(
        user_id,
        action_type,
        action_details,
        timestamp,
        session_id,
        device_info,
        location_info,
        browser_info
      );
      res.status(201).send("Дія користувача успішно додана до HBase");
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/user-actions",
  async (req: Request, res: Response, next: NextFunction) => {
    const startTimestamp = req.query.startTimestamp as string | undefined;
    const endTimestamp = req.query.endTimestamp as string | undefined;

    if (startTimestamp === undefined || endTimestamp === undefined) {
      res.status(400).send("Missing startTimestamp or endTimestamp");
      return;
    }

    try {
      const userActions = await getUserActionsByTimeRange(
        startTimestamp,
        endTimestamp
      );
      res.status(200).json(userActions);
    } catch (error) {
      console.error("Помилка при отриманні дій користувачів з HBase:", error);
      res.status(500).send("Помилка при отриманні дій користувачів з HBase");
    }
  }
);

export default router;
