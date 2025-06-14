'use client';

import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5091/api/Order', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!res.ok) throw new Error("Lỗi khi tải đơn hàng");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Đang tải đơn hàng...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Đơn hàng của bạn</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="border p-4 rounded mb-4 shadow-sm">
            <h3 className="font-semibold">Đơn hàng #{order.orderId}</h3>
            <p>Ngày đặt: {new Date(order.orderDate).toLocaleString()}</p>
            <p>Tổng tiền: {order.totalAmount.toLocaleString()}đ</p>
            <p>Phương thức: {order.paymentMethod || "Không có"}</p>
            <div className="mt-2">
              <p className="font-semibold">Chi tiết:</p>
              <ul className="ml-4 list-disc">
                {order.orderDetails.map((detail: any) => (
                  <li key={detail.orderDetailId}>
                    {detail.product?.name || "Sản phẩm đã xóa"} - SL: {detail.quantity} - Giá: {detail.unitPrice.toLocaleString()}đ
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
