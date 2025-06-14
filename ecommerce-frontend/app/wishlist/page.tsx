'use client';
import React, { useEffect, useState } from 'react';
import { fetchWishlist, removeFromWishlist } from '@/app/services/api';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  instock: number;
  imageUrl?: string;
  discount?: number;
};

type WishlistItem = {
  id: number;
  userId: string;
  productId: number;
  createdAt: string;
  product: Product;
};

export default function Page() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
  const router = useRouter();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchWishlist();
      setWishlist(response.data as WishlistItem[]);
    } catch (error: any) {
      console.error('Lỗi khi tải wishlist:', error);
      
      if (error.response?.status === 401) {
        setError('Vui lòng đăng nhập để xem danh sách yêu thích');
        // Có thể redirect đến trang login
        // router.push('/login');
      } else if (error.response?.status === 404) {
        // Wishlist trống - không phải lỗi
        setWishlist([]);
      } else {
        setError('Có lỗi xảy ra khi tải danh sách yêu thích');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      // Thêm productId vào set đang xử lý
      setRemovingIds(prev => new Set(prev).add(productId));
      
      await removeFromWishlist(productId);
      
      // Cập nhật state local
      setWishlist(prevWishlist => 
        prevWishlist.filter(item => item.productId !== productId)
      );
      
    } catch (error: any) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      
      let errorMessage = 'Có lỗi xảy ra khi xóa sản phẩm';
      if (error.response?.status === 404) {
        errorMessage = 'Không tìm thấy sản phẩm trong danh sách yêu thích';
      } else if (error.response?.status === 401) {
        errorMessage = 'Vui lòng đăng nhập lại';
      }
      
      // Hiển thị error (có thể dùng toast thay vì alert)
      alert(errorMessage);
      
    } finally {
      // Xóa productId khỏi set đang xử lý
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleMoveToCart = async (productId: number) => {
    try {
      // Implement move to cart logic nếu cần
      // await moveToCart(productId);
      console.log('Move to cart:', productId);
    } catch (error) {
      console.error('Lỗi khi chuyển vào giỏ hàng:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p>Đang tải danh sách yêu thích...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
        <button
          onClick={loadWishlist}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách yêu thích</h1>
        <p className="text-gray-600">
          {wishlist.length} sản phẩm
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <p className="text-gray-600 mb-4">Bạn chưa có sản phẩm nào trong danh sách yêu thích.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Khám phá sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow">
              {item.product.imageUrl && (
                <div className="relative mb-3">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.jpg'; // Fallback image
                    }}
                  />
                  {item.product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{item.product.discount}%
                    </span>
                  )}
                </div>
              )}
              
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{item.product.name}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.product.description}</p>
              
              <div className="mb-3">
                <p className="text-lg font-bold text-red-600">
                  {item.product.price.toLocaleString()} đ
                </p>
                {item.product.instock <= 0 && (
                  <p className="text-red-500 text-sm">Hết hàng</p>
                )}
                {item.product.instock > 0 && item.product.instock <= 5 && (
                  <p className="text-orange-500 text-sm">Chỉ còn {item.product.instock} sản phẩm</p>
                )}
              </div>

              <p className="text-xs text-gray-400 mb-3">
                Thêm vào: {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemove(item.productId)}
                  disabled={removingIds.has(item.productId)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {removingIds.has(item.productId) ? 'Đang xóa...' : 'Xóa'}
                </button>
                
                <button
                  onClick={() => router.push(`/products/${item.productId}`)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                >
                  Xem chi tiết
                </button>
              </div>

              {/* Optional: Move to cart button */}
              {item.product.instock > 0 && (
                <button
                  onClick={() => handleMoveToCart(item.productId)}
                  className="w-full mt-2 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                >
                  Thêm vào giỏ hàng
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}