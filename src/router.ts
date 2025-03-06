import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers";

const router = Router();

// Auth and Register
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("The handle cannot be empty"),
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("email").isEmail().withMessage("The email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long"),
  createAccount,
);

// Auth and Login
router.post(
  "/auth/login",
  body("email").isEmail().withMessage("The email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  login,
);

export default router;
