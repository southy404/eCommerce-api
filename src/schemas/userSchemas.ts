import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ID");

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  email: z.email("Invalid email address").trim().toLowerCase().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
});

export const userParamsSchema = z.object({
  id: objectIdSchema,
});
