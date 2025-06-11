'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-orange-400 transition">
          Logo
        </Link>

        {/* Các liên kết */}
        <div className="space-x-4 text-sm sm:text-base">
          <Link href="/" className="hover:text-orange-400">Trang chủ</Link>
          <Link href="/shop" className="hover:text-orange-400">Sản phẩm</Link>
          <Link href="/categories" className="hover:text-orange-400">Danh mục</Link>
          <Link href="/admin" className="hover:text-orange-400">Quản trị</Link>
          <Link href="/cart" className="hover:text-orange-400">Giỏ hàng</Link>
        </div>
      </div>
    </nav>
  );
}
