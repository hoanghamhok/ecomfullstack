'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import CategoryDropdown from './CategoryDropdown';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUsername(user.username || user.fullName || "user");
      } catch {
        setUsername(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername(null);
    router.push("/"); // hoặc router.refresh() nếu bạn muốn reload lại trạng thái
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-500">
          GoCart
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
          <Link href="/shop" className="hover:text-orange-500">Sản phẩm</Link>
          <CategoryDropdown />
          <Link href="/admin" className="flex items-center gap-1 hover:text-orange-500">
            <User size={18} />Quản trị
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-orange-500">
            <ShoppingCart size={18} /> Giỏ hàng
          </Link>

          {/* Đăng nhập / Xin chào + Logout */}
          {username ? (
            <div className="flex items-center gap-3 text-gray-600">
              <span>Xin chào, <strong>{username}</strong></span>
              <button onClick={handleLogout} className="text-red-500 hover:underline text-sm">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="hover:text-orange-500">Login</Link>
          )}
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

          {username ? (
            <div className="text-gray-600">
              <p>Xin chào, <strong>{username}</strong></p>
              <button onClick={handleLogout} className="text-red-500 hover:underline text-sm mt-1">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="block hover:text-orange-500">Login</Link>
          )}
        </div>
      )}
    </header>
  );
}
