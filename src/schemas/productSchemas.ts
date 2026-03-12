import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ID");

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  categoryId: objectIdSchema,
});

export const updateProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  description: z.string().trim().min(1, "Description is required").optional(),
  price: z.number().min(0, "Price must be 0 or greater").optional(),
  categoryId: objectIdSchema.optional(),
});

export const productParamsSchema = z.object({
  id: objectIdSchema,
});

export const productQuerySchema = z.object({
  categoryId: objectIdSchema.optional(),
});
