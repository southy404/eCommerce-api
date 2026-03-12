import type { Request, Response } from "express";
import { Order } from "../models/Order.ts";
import { User } from "../models/User.ts";
import { Product } from "../models/Product.ts";
import { AppError } from "../utils/appError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { serializeOrder } from "../utils/serializers.ts";

type OrderItemInput = {
  productId: string;
  quantity: number;
};

export const getOrders = asyncHandler(async (_req: Request, res: Response) => {
  const orders = await Order.find().select("-__v");

  res.status(200).json({
    success: true,
    data: orders.map(serializeOrder),
  });
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).select("-__v");

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    res.status(200).json({
      success: true,
      data: serializeOrder(order),
    });
  }
);

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { userId, products } = req.body as {
    userId: string;
    products: OrderItemInput[];
  };

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User does not exist", 400);
  }

  const productIds = products.map((item) => item.productId);

  const existingProducts = await Product.find({
    _id: { $in: productIds },
  });

  if (existingProducts.length !== productIds.length) {
    throw new AppError("One or more products do not exist", 400);
  }

  const productMap = new Map(
    existingProducts.map((product) => [product._id.toString(), product])
  );

  const total = products.reduce((sum, item) => {
    const product = productMap.get(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const order = await Order.create({
    userId,
    products,
    total,
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: serializeOrder(order),
  });
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { userId, products } = req.body as {
    userId?: string;
    products?: OrderItemInput[];
  };

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (userId !== undefined) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User does not exist", 400);
    }

    order.userId = userId as any;
  }

  if (products !== undefined) {
    const productIds = products.map((item) => item.productId);

    const existingProducts = await Product.find({
      _id: { $in: productIds },
    });

    if (existingProducts.length !== productIds.length) {
      throw new AppError("One or more products do not exist", 400);
    }

    const productMap = new Map(
      existingProducts.map((product) => [product._id.toString(), product])
    );

    const total = products.reduce((sum, item) => {
      const product = productMap.get(item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);

    order.products = products as any;
    order.total = total;
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: serializeOrder(order),
  });
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
