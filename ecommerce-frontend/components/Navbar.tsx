'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import CategoryDropdown from './CategoryDropdown'; 

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-500">
          GoCart
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
          <Link href="/shop" className="hover:text-orange-500">Sản phẩm</Link>
          {/* Danh mục dropdown */}
          <CategoryDropdown />
          <Link href="/admin" className="flex items-center gap-1 hover:text-orange-500"><User size={18} />Quản trị</Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-orange-500">
            <ShoppingCart size={18} /> Giỏ hàng
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium">
          <Link href="/" className="block hover:text-orange-500">Trang chủ</Link>
          <Link href="/shop" className="block hover:text-orange-500">Sản phẩm</Link>
          <Link href="/categories" className="block hover:text-orange-500">Danh mục</Link>
          <Link href="/admin" className="block hover:text-orange-500">Quản trị</Link>
          <Link href="/cart" className="block hover:text-orange-500">Giỏ hàng</Link>
        </div>
      )}
    </header>
  );
}
