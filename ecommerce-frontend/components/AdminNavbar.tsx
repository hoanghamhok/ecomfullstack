'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

interface AdminNavbarProps {
  title: string;
}

export default function AdminNavbar({ title }: AdminNavbarProps) {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !(langRef.current as any).contains(event.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-24 bg-white shadow-md z-30 px-6 flex items-center justify-between">
      {/* Góc trái: Logo */}
      <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
        <FontAwesomeIcon icon={faChartPie} className="text-blue-600 animate-pulse" />
        <span className="hover:scale-105 transition-transform duration-300">GOCART Admin</span>
      </div>

      {/* Giữa: Tiêu đề trang và thanh tìm kiếm */}
      <div className="flex flex-col items-center w-1/3">
        <h1 className="text-lg font-semibold text-gray-700 mb-1">{title}</h1>
        <div className="relative flex items-center w-full max-w-md bg-[#f1f5f9] hover:shadow-md rounded-full px-4 py-1 transition">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-transparent outline-none border-none text-sm px-2 py-1"
          />
        </div>
      </div>

      {/* Góc phải: Biểu tượng, ngôn ngữ và link */}
      <div className="flex items-center gap-4 text-gray-700">
        <div className="p-2 rounded-full hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer">
          <Bell className="w-5 h-5" />
        </div>

        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="text-xl hover:scale-110 transition-transform cursor-pointer"
          >
            🌐
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md border z-50 animate-fadeIn">
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🇻🇳 Tiếng Việt</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🇬🇧 English</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🇯🇵 日本語</li>
              </ul>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-blue-600 hover:underline underline-offset-4 transition-colors duration-300"
          >
            Trang chủ
          </Link>
          <Link
            href="/admin"
            className="hover:text-blue-600 hover:underline underline-offset-4 transition-colors duration-300"
          >
            Quản trị
          </Link>
        </nav>
      </div>
    </div>
  );
}
