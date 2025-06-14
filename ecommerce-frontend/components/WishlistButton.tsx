'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishlistToggle = async () => {
    if (!productId) {
      console.error('Product ID is required');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/Wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const responseData = await res.json().catch(() => null);

      if (res.ok) {
        setIsInWishlist(prev => !prev);
        console.log(isInWishlist ? 'Đã xóa khỏi wishlist!' : 'Đã thêm vào wishlist!');
      } else if (res.status === 401) {
        alert('Vui lòng đăng nhập để sử dụng wishlist');
      } else if (res.status === 500) {
        console.error('Lỗi server:', responseData);
        alert('Lỗi máy chủ, vui lòng thử lại sau.');
      } else {
        console.error('Lỗi khác:', res.status, responseData);
        alert(responseData?.message || 'Đã xảy ra lỗi.');
      }
    } catch (err) {
      console.error('Lỗi kết nối:', err);
      alert('Không thể kết nối đến máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
        ${isLoading
          ? 'bg-gray-300 cursor-not-allowed'
          : isInWishlist
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `}
    >
      <Heart
        size={20}
        className={isInWishlist ? 'fill-current text-red-500' : 'text-gray-500'}
      />
      {isLoading ? 'Đang xử lý...' : isInWishlist ? 'Đã yêu thích' : 'Yêu thích'}
    </button>
  );
}
