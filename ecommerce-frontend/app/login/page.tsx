// app/login/page.tsx
'use client';

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { login } from "../services/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      // Lưu JWT token vào localStorage hoặc state
      const data = response.data as { token: string,user: any };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Token:", localStorage.getItem("token"));
      // Chuyển hướng đến trang chủ hoặc trang dashboard sau khi đăng nhập thành công
      router.push("/");
    } catch (error: any) {
      setErrorMessage(error.response ? error.response.data : "Something went wrong");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="username"
            id="username"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Nhập username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
