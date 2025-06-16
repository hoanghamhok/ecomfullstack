'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

export default function ProductDetailClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;

    if (!userId || !token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5091/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId: product.id }),
      });

      if (res.ok) {
        setAdded(true);
      } else {
        const err = await res.text();
        console.error('Lỗi khi thêm wishlist:', err);
      }
    } catch (err) {
      console.error('Lỗi kết nối:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link> &gt;{" "}
        <Link href="/shop/categories" className="hover:text-blue-600">Danh mục</Link> &gt;{" "}
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
            className="rounded-lg max-h-[400px] w-full object-contain"
          />
        </div>
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-base">{product.description}</p>
          <div className="text-2xl font-semibold text-red-600">
            {product.price.toLocaleString()} ₫
          </div>
          <p className="text-sm text-gray-500">Tình trạng: {product.instock > 0 ? 'Còn hàng' : 'Hết hàng'}</p>
          <AddToCartButton productId={product.id} />
          <button onClick={handleAddToWishlist} className="text-red-500 hover:text-red-600">
            <Heart fill={added ? 'red' : 'none'} />
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm liên quan</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {relatedProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p.id}
                href={`/shop/product/${p.id}`}
                className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col"
              >
                <img
                  src={p.imageUrl || "https://via.placeholder.com/200"}
                  alt={p.name}
                  className="rounded-md h-40 object-contain mb-3"
                />
                <h3 className="text-gray-800 font-medium">{p.name}</h3>
                <p className="text-red-500 text-sm font-semibold mt-1">
                  {p.price.toLocaleString()} ₫
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
