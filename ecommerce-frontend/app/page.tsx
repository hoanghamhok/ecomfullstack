'use client';

import React, { use, useEffect } from "react";
import { addToCart, fetchProducts } from "./services/api";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    fetchProducts().then((res) => {
      setProducts(res.data as any[]);
    })
  }, []);

  const handleAddToCart = async (productId: number) => {
    try{
      await addToCart({productId, quantity: 1});
      alert("Đã thêm sản phẩm vào giỏ.");
    }catch (err){
      alert("Lỗi khi thêm sản phẩm vào giỏ.");
    }
  };

  return (
    <div>
      {/* Banner Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Chào mừng đến với Trung Shop</h1>
        <p className="text-lg md:text-2xl mb-8">Nơi trải nghiệm mua sắm sản phẩm công nghệ, thời trang, gia dụng và nhiều hơn nữa!</p>
        <a
          href="#products"
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition"
        >
          Xem Sản phẩm
        </a>
      </section>

      {/* Section nổi bật */}
      <section className="max-w-6xl mx-auto my-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <svg className="w-12 h-12 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="text-lg font-bold">Đa dạng sản phẩm</h3>
          <p className="text-center text-gray-500">Hàng ngàn sản phẩm với giá tốt nhất, cập nhật liên tục theo xu hướng mới.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 13V7a2 2 0 00-2-2h-4V3H8v2H4a2 2 0 00-2 2v6M16 21a4 4 0 01-8 0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="text-lg font-bold">Giao hàng nhanh chóng</h3>
          <p className="text-center text-gray-500">Đặt hàng hôm nay, giao hàng tận nơi chỉ trong 1-3 ngày làm việc.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <svg className="w-12 h-12 text-yellow-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="text-lg font-bold">Chính sách hoàn trả</h3>
          <p className="text-center text-gray-500">Yên tâm mua sắm với chính sách đổi trả trong 7 ngày.</p>
        </div>
      </section>

      {/* Danh sách sản phẩm */}
      <section id="products" className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">Sản phẩm nổi bật</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">Chưa có sản phẩm nào!</div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-xl p-4 flex flex-col">
                  <div className="h-44 w-full mb-2 flex justify-center items-center overflow-hidden rounded">
                    <img
                      src={p.imageUrl || "https://via.placeholder.com/150"}
                      alt={p.name}
                      className="object-contain h-full max-w-full"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-gray-700">{p.name}</h3>
                  <div className="text-gray-600 text-sm flex-1 mb-2">{p.description}</div>
                  <div className="font-bold text-blue-600 text-xl mb-2">{Number(p.price).toLocaleString()} ₫</div>
                  <a
                    href={`shop/product/${p.id}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center transition"
                  >
                    Xem chi tiết
                  </a>
                  <button onClick={() => handleAddToCart(p.id)} className="bg-yellow-600 text-white rounded py-2 mt-2">Thêm vào giỏ hàng</button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Link đến trang giỏ hàng */}
      <div className="text-center mt-4">
        <Link href="/cart" className="inline-block bg-blue-600 text-white 
                  py-2 px-4 rounded hover:bg-blue-700 transition">
            Xem giỏ hàng
        </Link>
      </div>

      {/* Footer đơn giản */}
      <footer className="mt-12 py-8 bg-gray-800 text-center text-gray-200">
        &copy; {new Date().getFullYear()} GoCart. All rights reserved.
      </footer>
    </div>
  );
}