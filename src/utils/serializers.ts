export function serializeUser(user: any) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function serializeCategory(category: any) {
  return {
    id: category._id.toString(),
    name: category.name,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export function serializeProduct(product: any) {
  return {
    id: product?._id?.toString?.() ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    categoryId: product?.categoryId ? product.categoryId.toString() : "",
    createdAt: product?.createdAt ?? null,
    updatedAt: product?.updatedAt ?? null,
  };
}

export function serializeOrder(order: any) {
  return {
    id: order?._id?.toString?.() ?? "",
    userId: order?.userId ? order.userId.toString() : "",
    products: Array.isArray(order?.products)
      ? order.products.map((item: any) => ({
          productId: item?.productId ? item.productId.toString() : "",
          quantity: item?.quantity ?? 0,
        }))
      : [],
    total: order?.total ?? 0,
    createdAt: order?.createdAt ?? null,
    updatedAt: order?.updatedAt ?? null,
  };
}
