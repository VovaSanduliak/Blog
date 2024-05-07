import express from "express";
import { body } from "express-validator";
import authController from "../../controllers/auth-controller";
const router = express.Router();

//router.get("/me")
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),

  authController.registration
);

export default router;
