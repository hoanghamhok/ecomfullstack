'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: number;
  date: string;
  total: number;
  status: string;
  items: {
    productId: number;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Giả lập gọi API, thay thế bằng API thực tế nếu có
        const data: Order[] = [
          {
            id: 101,
            date: '2025-06-10',
            total: 350000,
            status: 'Đang xử lý',
            items: [
              { productId: 1, name: 'Áo thun nam', quantity: 2, price: 150000 },
              { productId: 3, name: 'Quần jean nữ', quantity: 1, price: 50000 },
            ],
          },
          {
            id: 102,
            date: '2025-06-01',
            total: 500000,
            status: 'Hoàn thành',
            items: [
              { productId: 2, name: 'Giày thể thao', quantity: 1, price: 500000 },
            ],
          },
        ];

        setOrders(data);
      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Đang tải đơn hàng...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📦 Đơn hàng của bạn</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border rounded p-4 shadow">
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">Mã đơn hàng #{order.id}</h2>
                <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="text-sm text-gray-700 mb-2">Trạng thái: <strong>{order.status}</strong></div>
              <ul className="space-y-1 mb-2">
                {order.items.map(item => (
                  <li key={item.productId} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()}₫</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold">
                Tổng: {order.total.toLocaleString()}₫
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
