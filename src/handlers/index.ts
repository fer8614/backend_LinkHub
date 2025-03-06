import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from "slug";
import User from "../models/User";
import { hashpassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  // Manage errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("User already exists");
    res.status(409).json({ error: error.message });
    return;
  }

  const handle = slug(req.body.handle, "");
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("Handle already exists");
    res.status(409).json({ error: error.message });
    return;
  }

  const user = new User(req.body);
  user.password = await hashpassword(password);
  user.handle = handle;

  await user.save();
  res.status(201).send("User registered successfully");
};
