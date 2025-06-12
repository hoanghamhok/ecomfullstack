'use client';

import { handleAddToCart } from "@/app/libs/cart";

export default function AddToCartButton({ productId }: { productId: number }) {
  return (
    <button
      onClick={() => handleAddToCart(productId)}
      className="bg-yellow-600 text-white rounded py-2 px-4 mt-2"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
