import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ID");

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
});

export const categoryParamsSchema = z.object({
  id: objectIdSchema,
});
