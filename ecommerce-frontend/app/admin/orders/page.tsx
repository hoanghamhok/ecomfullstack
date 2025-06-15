'use client';

import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchUsers } from '@/app/services/api';

interface Order {
  orderId: number;
  orderdate: string;
  totalamount: number;
  userId: number;
  status: string;
  user?: any;
  createdAt?: string;
}

interface User {
  id: number;
  username: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchOrders().then((res) => setOrders(res.data as any));
    fetchUsers().then(res => setUsers(res.data as any));
  }, []);

  return (
    <div className="ml-60 pt-24 px-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📦 Quản lý Đơn Hàng</h1>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left">Mã đơn</th>
                <th className="py-3 px-4 text-left">Ngày đặt</th>
                <th className="py-3 px-4 text-left">Tổng tiền</th>
                <th className="py-3 px-4 text-left">Người dùng</th>
                <th className="py-3 px-4 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, index) => (
                <tr
                  key={o.orderId}
                  className={`border-b transition duration-300 ease-in-out ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50`}
                >
                  <td className="py-3 px-4">{o.orderId}</td>
                  <td className="py-3 px-4">{o.orderdate}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">
                    {o.totalamount.toLocaleString()} đ
                  </td>
                  <td className="py-3 px-4">{o.user?.username || 'Không có'}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium
                        ${
                          o.status === 'Hoàn thành'
                            ? 'bg-green-100 text-green-700'
                            : o.status === 'Đã hủy'
                            ? 'bg-red-100 text-red-700'
                            : o.status === 'Đang giao'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
