import type { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("User already exists");
    res.status(409).json({ error: error.message });
    return;
  }

  const user = new User(req.body);
  await user.save();
  res.status(201).send("User registered successfully");
};
