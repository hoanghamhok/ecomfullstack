'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Search, 
  Bell,
  Heart,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Star,
  Zap,ListOrderedIcon
} from 'lucide-react';
import CategoryDropdown from './CategoryDropdown';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [id, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [notifications, setNotifications] = useState(2);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  // const pathname = usePathname();
  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('id') : null;
  // if (pathname.startsWith('/admin')) return null;

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUsername(user.username || user.fullName || "user");
        setIsAdmin(user.role?.toLowerCase() === "admin");
      } catch {
        setUsername(null);
        setIsAdmin(false);
      }
      const userId = localStorage.getItem("id");
      if (userId) {
        setUserId(userId);
      } else {
        setUserId(null);
      }
    }
  // Handle scroll effect
  const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername(null);
    setUserMenuOpen(false);
    router.push("/");
  };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3" />
              <span>Hotline: 0766 403 280</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3" />
              <span>support@gocart.vn</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3" />
              <span>Hà Nội, Việt Nam</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>Miễn phí vận chuyển đơn từ 500K</span>
            </span>
            <span className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Giao hàng siêu tốc 2h</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg border-b border-slate-200' : 'shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Navigation Row */}
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                <span className="text-2xl font-bold text-white">G</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                  GoCart
                </h1>
                <p className="text-xs text-slate-500 -mt-1">Premium Shopping</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors duration-200" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all duration-200 group-hover:bg-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="relative p-3 hover:bg-slate-100 rounded-xl transition-colors duration-200 group"
                >
                  <Heart className="w-5 h-5 text-slate-600 group-hover:text-red-500" />
                  {/* <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    
                  </span> */}
                </Link>

                {/* Notifications */}
                {/* <button className="relative p-3 hover:bg-slate-100 rounded-xl transition-colors duration-200 group">
                  <Bell className="w-5 h-5 text-slate-600 group-hover:text-blue-500" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button> */}

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative p-3 hover:bg-slate-100 rounded-xl transition-colors duration-200 group"
                >
                  <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:text-emerald-500" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* User Section */}
              {username ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-3 p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-slate-800">Xin chào!</p>
                      <p className="text-xs text-slate-500">{username}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-semibold text-slate-800">{username}</p>
                        <p className="text-sm text-slate-500">Thành viên GoCart</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href={userId ? `/profile/${userId}` : "#"}
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <User className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-700">Tài khoản của tôi</span>
                        </Link>
                        <Link
                          href="/cart"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <ShoppingCart className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-700">Giỏ hàng của tôi</span>
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <ListOrderedIcon className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-700">Đơn hàng của tôi</span>
                        </Link>
                        {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <User className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-700">Quản trị</span>
                        </Link>)}
                      </div>
                      <div className="border-t border-slate-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-red-50 transition-colors duration-200"
                        >
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-slate-600 hover:text-emerald-500 font-medium transition-colors duration-200"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center justify-between py-3 border-t border-slate-100">
            <nav className="flex items-center space-x-8">
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 text-slate-700 hover:text-emerald-500 font-medium transition-colors duration-200 relative group"
              >
                <span>Trang chủ</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/shop"
                className="flex items-center space-x-2 px-3 py-2 text-slate-700 hover:text-emerald-500 font-medium transition-colors duration-200 relative group"
              >
                <span>Sản phẩm</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              {/* <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 text-slate-700 hover:text-emerald-500 font-medium transition-colors duration-200">
                  <span>Danh mục</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* CategoryDropdown can be added here */}
              {/* </div> */}
              <Link
                href="/deals"
                className="flex items-center space-x-2 px-3 py-2 text-slate-700 hover:text-emerald-500 font-medium transition-colors duration-200 relative group"
              >
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Khuyến mãi</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </nav>

            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online 24/7</span>
              </div>
              <span>•</span>
              <span>Giao hàng toàn quốc</span>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
          </form>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* User Info - Mobile */}
              {username ? (
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Xin chào!</p>
                    <p className="text-sm text-slate-500">{username}</p>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link
                    href="/login"
                    className="flex-1 py-3 text-center bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors duration-200"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 py-3 text-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}

              {/* Navigation Links - Mobile */}
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">🏠</span>
                  </div>
                  <span className="font-medium text-slate-700">Trang chủ</span>
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600">🛍️</span>
                  </div>
                  <span className="font-medium text-slate-700">Sản phẩm</span>
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">📂</span>
                  </div>
                  <span className="font-medium text-slate-700">Danh mục</span>
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium text-slate-700">Giỏ hàng</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                {username && (
                  <>
                    <Link
                      href="/admin"
                      className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors duration-200"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="font-medium text-slate-700">Quản trị</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 p-3 hover:bg-red-50 rounded-xl transition-colors duration-200 w-full text-left"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium text-red-600">Đăng xuất</span>
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Click Outside Handler for User Menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
}