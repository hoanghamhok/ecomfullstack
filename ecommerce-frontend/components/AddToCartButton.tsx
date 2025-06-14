'use client';

import { handleAddToCart } from "@/app/libs/cart";

export default function AddToCartButton({ productId }: { productId: number }) {
  return (
    <button
      onClick={() => handleAddToCart(productId)}
      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-500 hover:scale-105 transition-all duration-200 group"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
