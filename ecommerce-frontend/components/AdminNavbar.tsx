'use client';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-white shadow z-50 flex items-center px-6">
      
      {/* Bên trái: Tên trang */}
      <div className="w-1/3">
        <span className="text-xl font-bold text-black">Quản trị</span>
      </div>

      {/* Giữa: Logo */}
      <div className="w-1/3 flex justify-center">
        <img src="/Gocart-preview.png" alt="Logo" className="h-16 w-50 object-contain"  />
      </div>

      {/* Bên phải: Menu */}
      <div className="w-1/3 flex justify-end gap-6 text-base font-medium text-gray-800">
        <a href="/" className="hover:text-blue-600">Trang chủ</a>
        <a href="/admin" className="hover:text-blue-600">Quản trị</a>
      </div>
    </div>
  );
}
