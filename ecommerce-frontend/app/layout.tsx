import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UserSidebar from "@/components/UserSidebar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/components/WishlistContext"; // Thêm dòng này
import { WishlistIcon } from "@/components/WishlistIcon"; // Thêm dòng này
// ...existing code...

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
        <WishlistProvider>
          <Navbar />
          {/* Thêm WishlistIcon vào Navbar nếu muốn */}
          <div className="ml-auto flex items-center">
            <WishlistIcon />
          </div>
          <div className="flex">
            <UserSidebar />
            <main className="flex-1 min-h-screen p-4">
              {children}
            </main>
          </div>
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}