'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faBox,
  faShoppingCart,
  faFileInvoice,
  faUsers,
  faStar,
  faFolder
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleMenu = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  return (
    <aside className="fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-white shadow text-gray-800 px-3 py-4 z-40">
      <ul className="mt-0 ml-6 space-y-10 text-lg font-medium">
        <li>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
            <FontAwesomeIcon icon={faChartPie} />
            <span>Dashboard</span>
          </a>
        </li>

        <li>
          <a href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
            <FontAwesomeIcon icon={faFolder} />
            <span>Nhóm sản phẩm</span>
          </a>
        </li>

        <li>
          <a href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
            <FontAwesomeIcon icon={faBox} />
            <span>Sản phẩm</span>
          </a>
        </li>
        
        <li>
          <a href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
            <FontAwesomeIcon icon={faFileInvoice} />
            <span>Đơn hàng</span>
          </a>
        </li>
        <li>
          <a href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
            <FontAwesomeIcon icon={faUsers} />
            <span>Người dùng</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
            <FontAwesomeIcon icon={faStar} />
            <span>Khuyến Mãi</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
