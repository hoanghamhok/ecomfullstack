'use client';

import React from 'react';
import Image from 'next/image';
import { useWishlist, WishlistItem } from './WishlistContext';

interface WishlistItemCardProps {
  item: WishlistItem;
}

export const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item }) => {
  const { removeFromWishlist, loading } = useWishlist();

  const handleRemove = async () => {
    await removeFromWishlist(item.productId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Remove Button */}
        <button
          onClick={handleRemove}
          disabled={loading}
          className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 disabled:opacity-50"
          title="Xóa khỏi yêu thích"
        >
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.product.name}
        </h3>
        
        {item.product.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {item.product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(item.product.price)}
          </span>
          
          {item.product.category && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {item.product.category}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            ID: {item.productId}
          </span>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
              Xem chi tiết
            </button>
            <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};