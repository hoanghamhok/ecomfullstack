'use client';
import { useState, useEffect } from 'react';

export default function ProductWishlistButton({ productId }: { productId: number }) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const handleWishlistToggle = async () => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;
    if (!userId) return alert("Vui lòng đăng nhập");

    const isWishlisted = wishlist.includes(productId);

    try {
      if (isWishlisted) {
        await fetch(`http://localhost:5091/api/wishlist?userId=${userId}&productId=${productId}`, { method: 'DELETE' });
        setWishlist(prev => prev.filter(id => id !== productId));
      } else {
        await fetch(`http://localhost:5091/api/wishlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: parseInt(userId), productId }),
        });
        setWishlist(prev => [...prev, productId]);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật wishlist:", err);
    }
  };

  return (
    <button onClick={handleWishlistToggle}>
      {wishlist.includes(productId) ? '❤️' : '🤍'}
    </button>
  );
}
