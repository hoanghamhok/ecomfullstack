"use client";

import { useEffect, useState } from "react";
import { FileText, Calendar, ShoppingCart, ArrowRight } from "lucide-react";

interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: number;
  createdAt: string;
  orderDetails: OrderDetail[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5091/api/Order/admin");
        if (!res.ok) throw new Error("Lỗi khi lấy đơn hàng.");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10 mt-5">
          <FileText className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Quản lý đơn hàng</h2>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-blue-400 mb-6 text-5xl">🧾</div>
            <h2 className="text-xl font-semibold mb-2">Chưa có đơn hàng nào</h2>
            <p className="text-slate-500">Hệ thống chưa ghi nhận đơn hàng nào từ khách hàng.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b">
                  <div className="flex items-center gap-3 mb-2 md:mb-0">
                    <ShoppingCart className="w-6 h-6 text-emerald-500" />
                    <span className="text-lg font-bold text-slate-900">
                      Đơn hàng #{order.orderId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <table className="w-full mb-3">
                    <thead>
                      <tr className="text-slate-500 text-sm">
                        <th className="text-left pb-2">Sản phẩm</th>
                        <th className="text-center pb-2">Số lượng</th>
                        <th className="text-right pb-2">Đơn giá</th>
                        <th className="text-right pb-2">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderDetails.map((detail, index) => (
                        <tr key={index} className="border-b last:border-b-0 hover:bg-slate-50">
                          <td className="py-2 font-medium">{detail.productName}</td>
                          <td className="py-2 text-center">{detail.quantity}</td>
                          <td className="py-2 text-right">{detail.price.toLocaleString("vi-VN")}₫</td>
                          <td className="py-2 text-right font-semibold text-emerald-600">
                            {(detail.price * detail.quantity).toLocaleString("vi-VN")}₫
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end items-center gap-3 mt-4">
                    <span className="font-bold text-slate-700">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {order.orderDetails
                        .reduce((sum, d) => sum + d.price * d.quantity, 0)
                        .toLocaleString("vi-VN")}
                      ₫
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
