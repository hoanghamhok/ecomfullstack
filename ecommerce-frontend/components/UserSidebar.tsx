'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Smartphone,
  Laptop,
  Shirt,
  Watch,
  Headphones,
  Home,
  MoreHorizontal,
  ChevronRight,
  Star,
  TrendingUp,Book,
  Zap
} from 'lucide-react';


const categories = [
  { 
    id: 7, 
    name: 'Điện thoại', 
    icon: Smartphone, 
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100',
    textColor: 'text-blue-600',
    count: '1,234',
    isHot: true
  },
  { 
    id: 8, 
    name: 'Laptop', 
    icon: Laptop, 
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100',
    textColor: 'text-purple-600',
    count: '856',
    isNew: true
  },
  { 
    id: 6, 
    name: 'Thời trang', 
    icon: Shirt, 
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    hoverColor: 'hover:bg-pink-100',
    textColor: 'text-pink-600',
    count: '2,341',
    isTrending: true
  },
  { 
    id: 9, 
    name: 'Phụ kiện', 
    icon: Headphones, 
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    hoverColor: 'hover:bg-emerald-100',
    textColor: 'text-emerald-600',
    count: '567'
  },
  { 
    id: 5, 
    name: 'Sách', 
    icon: Book, 
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    hoverColor: 'hover:bg-amber-100',
    textColor: 'text-amber-600',
    count: '423'
  },
  { 
    id: 3, 
    name: 'Đồ gia dụng', 
    icon: Home, 
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100',
    textColor: 'text-orange-600',
    count: '789'
  },
  { 
    id: 10, 
    name: 'Xem thêm', 
    icon: MoreHorizontal, 
    color: 'from-slate-500 to-slate-600',
    bgColor: 'bg-slate-50',
    hoverColor: 'hover:bg-slate-100',
    textColor: 'text-slate-600',
    count: '+50'
  },
];

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getBadgeIcon = (category: typeof categories[0]) => {
    if (category.isHot) return <Zap className="w-3 h-3" />;
    if (category.isNew) return <Star className="w-3 h-3" />;
    if (category.isTrending) return <TrendingUp className="w-3 h-3" />;
    return null;
  };

  const getBadgeColor = (category: typeof categories[0]) => {
    if (category.isHot) return 'bg-red-500 text-white';
    if (category.isNew) return 'bg-green-500 text-white';
    if (category.isTrending) return 'bg-yellow-500 text-white';
    return '';
  };
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-80'} hidden md:block bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 shadow-xl h-screen sticky top-0 transition-all duration-300 overflow-hidden`}>
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold">📱</span>
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="font-bold text-xl">Danh mục</h2>
                  <p className="text-sm text-slate-300">Khám phá sản phẩm</p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-2 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {categories.map((category, index) => (
          <Link
            href={`/shop/categories/${category.id}`}
            key={category.id}
            className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${category.hoverColor} ${
              activeCategory === category.id ? `${category.bgColor} shadow-md scale-105` : 'hover:bg-gradient-to-r hover:from-white hover:to-slate-50'
            }`}
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {/* Left Content */}
            <div className="flex items-center space-x-4">
              {/* Icon Container */}
              <div className={`relative w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                <category.icon className="w-6 h-6 text-white" />
                
                {/* Badge */}
                {(category.isHot || category.isNew || category.isTrending) && (
                  <div className={`absolute -top-1 -right-1 w-5 h-5 ${getBadgeColor(category)} rounded-full flex items-center justify-center shadow-lg`}>
                    {getBadgeIcon(category)}
                  </div>
                )}
              </div>

              {/* Text Content */}
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className={`font-semibold text-slate-800 group-hover:${category.textColor} transition-colors duration-200`}>
                    {category.name}
                  </span>
                  <span className="text-xs text-slate-500 group-hover:text-slate-600">
                    {category.count} sản phẩm
                  </span>
                </div>
              )}
            </div>

            {/* Right Arrow */}
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <ChevronRight className={`w-4 h-4 text-slate-400 transform transition-all duration-300 group-hover:text-slate-600 group-hover:translate-x-1 ${
                  activeCategory === category.id ? 'translate-x-1 text-slate-600' : ''
                }`} />
              </div>
            )}

            {/* Hover Effect Line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${category.color} rounded-r-full transform scale-y-0 transition-transform duration-300 group-hover:scale-y-100 ${
              activeCategory === category.id ? 'scale-y-100' : ''
            }`}></div>

            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </Link>
        ))}
      </nav>

      {/* Bottom Section - Statistics */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-100 to-transparent border-t border-slate-200">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-800">Thống kê</h4>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2 bg-blue-50 rounded-xl">
                <div className="text-lg font-bold text-blue-600">7</div>
                <div className="text-xs text-slate-600">Danh mục</div>
              </div>
              <div className="p-2 bg-emerald-50 rounded-xl">
                <div className="text-lg font-bold text-emerald-600">6.2K</div>
                <div className="text-xs text-slate-600">Sản phẩm</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Tooltip */}
      {isCollapsed && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </aside>
  );
}
