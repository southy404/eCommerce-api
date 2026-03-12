import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.ts";
import { validate } from "../middleware/validate.ts";
import {
  createProductSchema,
  updateProductSchema,
  productParamsSchema,
  productQuerySchema,
} from "../schemas/productSchemas.ts";

export const productRoutes = Router();

productRoutes.get("/", validate({ query: productQuerySchema }), getProducts);
productRoutes.get(
  "/:id",
  validate({ params: productParamsSchema }),
  getProductById
);
productRoutes.post("/", validate({ body: createProductSchema }), createProduct);
productRoutes.put(
  "/:id",
  validate({ params: productParamsSchema, body: updateProductSchema }),
  updateProduct
);
productRoutes.delete(
  "/:id",
  validate({ params: productParamsSchema }),
  deleteProduct
);
