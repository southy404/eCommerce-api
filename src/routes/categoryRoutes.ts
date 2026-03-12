import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.ts";
import { validate } from "../middleware/validate.ts";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryParamsSchema,
} from "../schemas/categorySchemas.ts";

export const categoryRoutes = Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.get(
  "/:id",
  validate({ params: categoryParamsSchema }),
  getCategoryById
);
categoryRoutes.post(
  "/",
  validate({ body: createCategorySchema }),
  createCategory
);
categoryRoutes.put(
  "/:id",
  validate({ params: categoryParamsSchema, body: updateCategorySchema }),
  updateCategory
);
categoryRoutes.delete(
  "/:id",
  validate({ params: categoryParamsSchema }),
  deleteCategory
);
