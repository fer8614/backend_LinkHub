import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

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
  handleInputErrors,
  createAccount,
);

// Auth and Login
router.post(
  "/auth/login",
  body("email").isEmail().withMessage("The email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  handleInputErrors,
  login,
);

// Get User
router.get("/user", getUser);

export default router;
