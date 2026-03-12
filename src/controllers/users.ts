import type { Request, Response } from "express";
import { User } from "../models/User.ts";
import { AppError } from "../utils/appError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { serializeUser } from "../utils/serializers.ts";

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find().select("-__v");

  res.status(200).json({
    success: true,
    data: users.map(serializeUser),
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-__v");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    data: serializeUser(user),
  });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: serializeUser(user),
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.params.id).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError("Email already exists", 400);
    }
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (password !== undefined) user.password = password;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: serializeUser(user),
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
