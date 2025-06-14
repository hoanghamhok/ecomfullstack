'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`http://localhost:5091/api/Order/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Đang tải đơn hàng...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Đơn hàng #{order.orderId}</h1>
      <p>Ngày đặt: {new Date(order.orderDate).toLocaleString()}</p>
      <p>Tổng tiền: {order.totalAmount.toLocaleString()}₫</p>

      <h2 className="mt-4 font-semibold">Chi tiết:</h2>
      <ul className="list-disc ml-6">
        {order.orderDetails.map((item: any) => (
          <li key={item.orderDetailId}>
            {item.product.name} - SL: {item.quantity} - Giá: {item.unitPrice.toLocaleString()}₫
          </li>
        ))}
      </ul>
    </div>
  );
}
