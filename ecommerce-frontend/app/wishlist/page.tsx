'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  instock: number;
  imageUrl: string;
  discount: number;
  categoryId: number;
};

type WishlistItem = {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  product: Product;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userId = typeof window !== 'undefined' ? localStorage.getItem('id') : null;

  useEffect(() => {
    if (!userId) {
      router.push('/login');
      return;
    }

    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`http://localhost:5091/api/wishlist/user/${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setWishlist(data);
      } else {
        console.error('Dữ liệu wishlist không đúng định dạng:', data);
      }
    } catch (error) {
      console.error('Lỗi lấy wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      const res = await fetch(`http://localhost:5091/api/wishlist?userId=${userId}&productId=${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setWishlist(prev => prev.filter(item => item.product.id !== productId));
      } else {
        const data = await res.json();
        console.error('Lỗi xoá khỏi wishlist:', data);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
    }
  };

  if (loading) return <p className="p-4">Đang tải wishlist...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách yêu thích</h1>

      {wishlist.length === 0 ? (
        <p>Chưa có sản phẩm nào trong danh sách yêu thích.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow bg-white">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-48 object-cover rounded mb-3" />
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-gray-600 text-sm">{item.product.description}</p>
              <p className="text-emerald-600 font-bold mt-1">{item.product.price.toLocaleString()}₫</p>
              <button
                className="text-red-500 mt-2 hover:underline"
                onClick={() => removeFromWishlist(item.product.id)}
              >
                Xoá khỏi Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
