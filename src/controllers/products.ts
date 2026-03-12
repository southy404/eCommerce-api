import type { Request, Response } from "express";
import { Product } from "../models/Product.ts";
import { Category } from "../models/Category.ts";
import { AppError } from "../utils/appError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { serializeProduct } from "../utils/serializers.ts";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.query;

  const filter: Record<string, unknown> = {};

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  const products = await Product.find(filter).select("-__v");

  res.status(200).json({
    success: true,
    data: products.map(serializeProduct),
  });
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).select("-__v");

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      data: serializeProduct(product),
    });
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, categoryId } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      throw new AppError("Category does not exist", 400);
    }

    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: serializeProduct(product),
    });
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, categoryId } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (categoryId !== undefined) {
      const category = await Category.findById(categoryId);

      if (!category) {
        throw new AppError("Category does not exist", 400);
      }

      product.categoryId = categoryId as any;
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: serializeProduct(product),
    });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
);
