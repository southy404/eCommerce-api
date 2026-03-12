import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.ts";
import { validate } from "../middleware/validate.ts";
import {
  createOrderSchema,
  updateOrderSchema,
  orderParamsSchema,
} from "../schemas/orderSchemas.ts";

export const orderRoutes = Router();

orderRoutes.get("/", getOrders);
orderRoutes.get("/:id", validate({ params: orderParamsSchema }), getOrderById);
orderRoutes.post("/", validate({ body: createOrderSchema }), createOrder);
orderRoutes.put(
  "/:id",
  validate({ params: orderParamsSchema, body: updateOrderSchema }),
  updateOrder
);
orderRoutes.delete(
  "/:id",
  validate({ params: orderParamsSchema }),
  deleteOrder
);
