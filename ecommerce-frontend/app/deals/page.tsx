'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  discount?: number;
};

export default function DealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch('http://localhost:5091/api/products');
        const data: Product[] = await res.json();

        const discounted = data.filter(p => p.discount && p.discount > 0);
        setProducts(discounted);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm giảm giá:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <p className="p-4 text-gray-600">Đang tải sản phẩm giảm giá...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-600">🔥 Ưu đãi hot hôm nay</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm giảm giá nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => {
            const priceAfterDiscount = Math.round(
              product.price * (1 - (product.discount || 0) / 100)
            );

            return (
              <div
                key={product.id}
                className="border p-4 rounded-2xl shadow-sm hover:shadow-lg bg-white relative"
              >
                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full shadow">
                  -{product.discount}%
                </span>

                {/* Image */}
                <img
                  src={product.imageUrl || '/default-image.png'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  onError={(e) => (e.currentTarget.src = '/default-image.png')}
                />

                {/* Product Name */}
                <h2 className="text-base font-semibold line-clamp-2 mb-1">{product.name}</h2>

                {/* Pricing */}
                <p className="text-red-600 font-bold text-lg">
                  {priceAfterDiscount.toLocaleString()}₫
                  <span className="line-through text-sm text-gray-400 ml-2">
                    {product.price.toLocaleString()}₫
                  </span>
                </p>

                {/* View and Add to Cart */}
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href={`/shop/product/${product.id}`}
                    className="text-sm text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                  <AddToCartButton productId={product.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
