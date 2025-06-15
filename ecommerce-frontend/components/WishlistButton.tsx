'use client';

import React from 'react';
import { useWishlist, WishlistItem } from './WishlistContext';

interface WishlistButtonProps {
  productId: number;
  product?: {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
  };
  variant?: 'icon' | 'button';
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  productId,
  product,
  variant = 'icon',
  className = '' 
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist, loading } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    
    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
          inWishlist 
            ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
        } ${className}`}
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg 
            className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`}
            fill={inWishlist ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        )}
        {loading ? 'Đang xử lý...' : (inWishlist ? 'Đã thích' : 'Yêu thích')}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-full transition-all hover:scale-110 disabled:opacity-50 ${
        inWishlist 
          ? 'text-red-500 bg-red-50 hover:bg-red-100' 
          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
      } ${className}`}
      title={loading ? 'Đang xử lý...' : (inWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích')}
    >
      {loading ? (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg 
          className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
          fill={inWishlist ? 'currentColor' : 'none'}
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      )}
    </button>
  );
};