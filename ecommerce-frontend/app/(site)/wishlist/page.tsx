'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, XCircle, ArrowRight } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  instock: number;
  imageUrl: string;
  discount: number;
  categoryId: number;
  createdAt: string;
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

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;

    if (!userId) {
      router.push('/login');
      return;
    }

    fetchWishlist(userId);
  }, []);

  const fetchWishlist = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5091/api/wishlist/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Không parse được JSON:", err);
        return;
      }
      if (Array.isArray(data)) {
        setWishlist(data);
      } else {
        console.error("Dữ liệu wishlist không đúng định dạng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userId = user?.id;

      if (!userId || !token) {
        router.push('/login');
        return;
      }

      const res = await fetch(`http://localhost:5091/api/wishlist?userId=${userId}&productId=${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setWishlist(prev => prev.filter(item => item.product.id !== productId));
      } else {
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error('Phản hồi không phải JSON:', text);
          return;
        }
        console.error('Lỗi xoá khỏi wishlist:', data);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-emerald-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <Heart className="w-8 h-8 text-pink-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Danh sách yêu thích</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-pink-400 mb-6 text-5xl">♡</div>
            <h2 className="text-xl font-semibold mb-2">Chưa có sản phẩm nào trong wishlist</h2>
            <p className="text-slate-500 mb-6">Hãy khám phá các sản phẩm và thêm vào danh sách yêu thích của bạn!</p>
            <button
              onClick={() => router.push('/shop')}
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-emerald-400 text-white px-8 py-3 rounded-xl font-bold hover:from-pink-600 hover:to-emerald-500 transition-all duration-200"
            >
              Khám phá sản phẩm
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 flex flex-col relative overflow-hidden"
              >
                {/* Remove Button */}
                <button
                  className="absolute top-3 right-3 bg-pink-100 hover:bg-pink-200 text-pink-500 rounded-full p-2 shadow transition z-10"
                  onClick={() => removeFromWishlist(item.product.id)}
                  title="Xoá khỏi Wishlist"
                >
                  <XCircle className="w-5 h-5" />
                </button>

                {/* Image */}
                <img
                  src={item.product.imageUrl || '/default-image.png'}
                  alt={item.product.name}
                  className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => (e.currentTarget.src = '/default-image.png')}
                />

                {/* Info */}
                <div className="flex-1 flex flex-col p-5">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.product.description}</p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-emerald-600 font-bold text-xl">
                      {Math.round(item.product.price * (1 - item.product.discount / 100)).toLocaleString()}₫
                    </span>

                    {item.product.discount > 0 && (
                      <>
                        <span className="line-through text-gray-400 text-sm">
                          {item.product.price.toLocaleString()}₫
                        </span>
                        <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold ml-2">
                          -{item.product.discount}%
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    className="mt-auto px-4 py-2 bg-gradient-to-r from-pink-500 to-emerald-400 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-emerald-500 transition-all duration-200"
                    onClick={() => router.push(`/shop/product/${item.product.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
