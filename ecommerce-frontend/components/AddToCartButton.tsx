'use client';

import { handleAddToCart } from "@/app/libs/cart";

export default function AddToCartButton({ productId }: { productId: number }) {
  return (
    <button
      onClick={() => handleAddToCart(productId)}
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded py-2"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
