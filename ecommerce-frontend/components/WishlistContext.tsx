'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types - Updated to match backend
export interface WishlistItem {
  id: number;
  userId: string;
  productId: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
  };
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => Promise<void>;
  itemCount: number;
  loading: boolean;
  error: string | null;
  checkProductInWishlist: (productId: number) => Promise<boolean>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // API Base URL - adjust according to your backend
  const API_BASE_URL = 'https://localhost:7029/api'; // Change this to your backend URL
  
  // Get auth token from localStorage or wherever you store it
  const getAuthToken = () => {
    try {
      return localStorage.getItem('authToken'); // Adjust based on your auth implementation
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  // Load wishlist from backend on mount
  useEffect(() => {
    const initializeWishlist = async () => {
      const token = getAuthToken();
      if (!token) {
        console.log('No auth token found, skipping wishlist load');
        setInitialized(true);
        return;
      }
      
      await loadWishlist();
      setInitialized(true);
    };

    initializeWishlist();
  }, []);

  const loadWishlist = async () => {
    const token = getAuthToken();
    if (!token) {
      console.log('No auth token found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch(`${API_BASE_URL}/Wishlist/get`, {
        headers: apiHeaders
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else if (response.status === 404) {
        // Empty wishlist is ok
        setItems([]);
      } else if (response.status === 401) {
        console.log('Unauthorized - token may be expired');
        setItems([]);
      } else {
        throw new Error(`HTTP ${response.status}: Failed to load wishlist`);
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
      setError('Không thể tải danh sách yêu thích');
      // Don't block the UI - set empty items
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();
      if (!token) {
        // Nếu không có token, vẫn cho phép thêm vào localStorage tạm thời
        console.log('No auth token, adding to local storage');
        const newItem: WishlistItem = {
          id: Date.now(), // Temporary ID
          userId: 'guest',
          productId,
          product: {
            id: productId,
            name: 'Product ' + productId,
            price: 0,
            image: 'https://via.placeholder.com/200'
          }
        };
        setItems(prev => [...prev, newItem]);
        return;
      }

      const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      
      const response = await fetch(`${API_BASE_URL}/Wishlist/add`, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({ productId })
      });

      if (response.ok) {
        // Reload wishlist to get updated data
        await loadWishlist();
      } else if (response.status === 401) {
        setError('Vui lòng đăng nhập để đồng bộ danh sách yêu thích');
        // Still add to local state
        const newItem: WishlistItem = {
          id: Date.now(),
          userId: 'guest',
          productId,
          product: {
            id: productId,
            name: 'Product ' + productId,
            price: 0,
            image: 'https://via.placeholder.com/200'
          }
        };
        setItems(prev => [...prev, newItem]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add to wishlist');
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      setError('Không thể thêm vào danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      setLoading(true);
      setError(null);

      // Remove from local state immediately for better UX
      setItems(prev => prev.filter(item => item.productId !== productId));

      const token = getAuthToken();
      if (!token) {
        console.log('No auth token, removed from local storage only');
        return;
      }

      const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      
      const response = await fetch(`${API_BASE_URL}/Wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: apiHeaders
      });

      if (!response.ok && response.status !== 401) {
        // If API fails (but not auth), add back to local state
        console.error('Failed to remove from server, but kept local change');
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError('Không thể xóa khỏi danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: number) => {
    return items.some(item => item.productId === productId);
  };

  const checkProductInWishlist = async (productId: number): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) {
      return false;
    }

    try {
      const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch(`${API_BASE_URL}/Wishlist/check/${productId}`, {
        headers: apiHeaders
      });

      if (response.ok) {
        const data = await response.json();
        return data.inWishlist;
      }
      return false;
    } catch (err) {
      console.error('Error checking product in wishlist:', err);
      return false;
    }
  };

  const clearWishlist = async () => {
    const token = getAuthToken();
    if (!token) {
      console.log('No auth token found');
      setError('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      
      const response = await fetch(`${API_BASE_URL}/Wishlist/clear`, {
        method: 'DELETE',
        headers: apiHeaders
      });

      if (response.ok) {
        setItems([]);
      } else if (response.status === 401) {
        setError('Vui lòng đăng nhập để sử dụng tính năng này');
      } else {
        throw new Error('Failed to clear wishlist');
      }
    } catch (err) {
      console.error('Error clearing wishlist:', err);
      setError('Không thể xóa danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    checkProductInWishlist,
    itemCount: items.length,
    loading,
    error,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};