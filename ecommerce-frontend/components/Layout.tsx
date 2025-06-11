// components/Layout.tsx
import React from "react";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>FoodMart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Gắn các file CSS từ thư mục public */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        {/* Các thẻ meta, favicon khác nếu cần */}
      </Head>

      {/* Header đơn giản */}
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FoodMart</h1>
          <nav>
            <a href="/" className="mr-4 hover:underline">
              Trang chủ
            </a>
            <a href="/products" className="hover:underline">
              Sản phẩm
            </a>
          </nav>
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="container mx-auto p-4">{children}</main>

      {/* Footer đơn giản */}
      <footer className="bg-gray-100 text-center p-4 mt-10">
        <p>&copy; {new Date().getFullYear()} FoodMart. All rights reserved.</p>
      </footer>

      {/* Gắn các file JS từ public nếu template cũ có */}
      <script src="/js/jquery-1.11.3.min.js"></script>
      <script src="/js/bootstrap.min.js"></script>
      <script src="/js/main.js"></script>
    </>
  );
}
