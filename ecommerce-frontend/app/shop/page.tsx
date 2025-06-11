// app/shop/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5091/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi tải sản phẩm:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Đang tải sản phẩm...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tất cả sản phẩm</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-sm hover:shadow-md transition">
            <img
              src={product.imageUrl || '/default-image.png'}
              alt={product.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">{product.price.toLocaleString()}₫</p>
            <Link
              href={`/shop/product/${product.id}`}
              className="block mt-2 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
