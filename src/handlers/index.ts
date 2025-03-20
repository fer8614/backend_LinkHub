import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from "slug";
import formidable from "formidable";
import User from "../models/User";
import { checkPassword, hashpassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

process.loadEnvFile();

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

  const token = generateJWT({ id: user.id });

  res.send(token);
};

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    const handle = slug(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists && handleExists.email !== req.user.email) {
      const error = new Error("Handle already exists");
      res.status(409).json({ error: error.message });
      return;
    }

    //Update user profile
    req.user.description = description;
    req.user.handle = handle;

    await req.user.save();
    res.status(200).send("Profile updated successfully");
  } catch (e) {
    const error = new Error("Error updating profile");
    res.status(500).json({ error: error.message });
    return;
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({
    multiples: false,
  });
  form.parse(req, (error, fields, files) => {
    console.log(files.file[0].filepath);
  });

  try {
  } catch (e) {
    const error = new Error("Error updating profile");
    res.status(500).json({ error: error.message });
    return;
  }
};
