"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, UserPlus, Loader2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    fullname: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5091/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.text();
        setError(err);
        setLoading(false);
        return;
      }

      setSuccess("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError("Đã xảy ra lỗi máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full p-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-800">Tạo tài khoản mới</h2>
        <p className="text-center text-slate-500 mb-6">Đăng ký để nhận ưu đãi và trải nghiệm mua sắm tuyệt vời cùng GoCart!</p>
        {error && (
          <div className="flex items-center bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
            <span className="mr-2">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>{success}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              name="fullname"
              placeholder="Họ và tên"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-emerald-500 transition-all duration-200 shadow-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Đang đăng ký...
              </>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>
        <div className="text-center mt-6 text-slate-500 text-sm">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            Đăng nhập ngay
          </a>
        </div>
      </div>
    </div>
  );
}
