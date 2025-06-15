'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const WishlistIcon: React.FC = () => {
  const [itemCount, setItemCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch wishlist count from backend
  const fetchWishlistCount = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on where you store the JWT token
      
      if (!token) {
        setItemCount(0);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/Wishlist/count', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItemCount(data.count || 0);
      } else if (response.status === 401) {
        // User not authenticated
        setItemCount(0);
      } else {
        console.error('Failed to fetch wishlist count:', response.statusText);
        setItemCount(0);
      }
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
      setItemCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch count on component mount
  useEffect(() => {
    fetchWishlistCount();
  }, []);

  // Refresh count when user navigates back to the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchWishlistCount();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Optional: Add event listener for wishlist updates
  useEffect(() => {
    const handleWishlistUpdate = () => {
      fetchWishlistCount();
    };

    // Listen for custom events (you can dispatch these when adding/removing items)
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

  return (
    <Link 
      href="/wishlist" 
      className="relative inline-flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      {/* Heart Icon */}
      <svg 
        className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" 
        fill="none" 
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
      
      {/* Loading indicator */}
      {isLoading && (
        <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </span>
      )}
      
      {/* Badge */}
      {!isLoading && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
      
      {/* Screen reader text */}
      <span className="sr-only">
        Wishlist ({isLoading ? 'loading' : `${itemCount} items`})
      </span>
    </Link>
  );
};