import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from "slug";
import User from "../models/User";
import { checkPassword, hashpassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
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

export const login = async (req: Request, res: Response) => {
  //Check user register
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    res.status(404).json({ error: error.message });
    return;
  }

  // Check password
  const isPasswordValid = await checkPassword(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid password");
    res.status(401).json({ error: error.message });
    return;
  }

  generateJWT(user);

  res.send("User logged in successfully");

  // Generate token
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

  // Send token
  // res.status(200).json({ token });
};
