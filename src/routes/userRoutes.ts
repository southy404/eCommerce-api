import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.ts";
import { validate } from "../middleware/validate.ts";
import {
  createUserSchema,
  updateUserSchema,
  userParamsSchema,
} from "../schemas/userSchemas.ts";

export const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/:id", validate({ params: userParamsSchema }), getUserById);
userRoutes.post("/", validate({ body: createUserSchema }), createUser);
userRoutes.put(
  "/:id",
  validate({ params: userParamsSchema, body: updateUserSchema }),
  updateUser
);
userRoutes.delete("/:id", validate({ params: userParamsSchema }), deleteUser);
