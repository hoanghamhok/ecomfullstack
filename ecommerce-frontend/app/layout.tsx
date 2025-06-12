import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // ✅ Import navbar
import UserSidebar from "@/components/UserSidebar"; // ✅ Import UserSidebar
import Footer from "@/components/Footer"; // ✅ Import footer
<meta charSet="UTF-8" />

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoCart - Trang thương mại điện tử",
  description: "Website bán hàng Next.js + ASP.NET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        <Navbar /> {/* ✅ Navbar cố định trên đầu */}

        <div className="flex">
          {/* ✅ Sidebar cố định bên trái (ẩn trên mobile nếu cần) */}
          <UserSidebar />

          {/* ✅ Nội dung chính */}
          <main className="flex-1 min-h-screen p-4">
            {children}
          </main>
        </div>
        <Footer /> {/* ✅ Footer hiển thị ở cuối trang */}
      </body>
    </html>
  );
}

