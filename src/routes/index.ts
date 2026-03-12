import { Router } from "express";
import { userRoutes } from "./userRoutes.ts";
import { categoryRoutes } from "./categoryRoutes.ts";
import { productRoutes } from "./productRoutes.ts";
import { orderRoutes } from "./orderRoutes.ts";

export const router = Router();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
