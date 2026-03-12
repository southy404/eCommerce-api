import type { Request, Response } from "express";
import { Category } from "../models/Category.ts";
import { AppError } from "../utils/appError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { serializeCategory } from "../utils/serializers.ts";

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await Category.find().select("-__v");

    res.status(200).json({
      success: true,
      data: categories.map(serializeCategory),
    });
  }
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id).select("-__v");

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    res.status(200).json({
      success: true,
      data: serializeCategory(category),
    });
  }
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await Category.create({ name });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: serializeCategory(category),
    });
  }
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    if (name !== undefined) category.name = name;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: serializeCategory(category),
    });
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  }
);
