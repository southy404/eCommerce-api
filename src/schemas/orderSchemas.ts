import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ID");

const orderProductItemSchema = z.object({
  productId: objectIdSchema,
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  userId: objectIdSchema,
  products: z
    .array(orderProductItemSchema)
    .min(1, "At least one product is required"),
});

export const updateOrderSchema = z.object({
  userId: objectIdSchema.optional(),
  products: z
    .array(orderProductItemSchema)
    .min(1, "At least one product is required")
    .optional(),
});

export const orderParamsSchema = z.object({
  id: objectIdSchema,
});
