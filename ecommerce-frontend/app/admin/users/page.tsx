'use client';

import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '@/app/services/api';
import { UserPlus } from 'lucide-react';

type User = {
  id: number;
  username: string;
  fullname: string;
  password: string;
  phone: string;
  role: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Omit<User, 'id'>>({
    username: '',
    fullname: '',
    password: '',
    phone: '',
    role: ''
  });

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers().then(res => setUsers(res.data as User[]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    const isExist = users.some(u => u.username === form.username);
    if (isExist) {
      alert("Tên người dùng đã tồn tại.");
      return;
    }

    createUser(form)
      .then(res => {
        const newUser = res.data as User;
        setUsers([...users, newUser]);
        setModalOpen(false);
      })
      .catch(err => {
        console.error("Lỗi tạo người dùng:", err);
        alert("Tạo người dùng thất bại.");
      });
  };

  return (
    <div className="ml-[15rem] pt-16 px-8 min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-sky-600 flex items-center gap-3 select-none">
          👥 Quản lý người dùng
        </h1>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white px-5 py-3 rounded-xl shadow-lg hover:brightness-110 transition"
          onClick={() => setModalOpen(true)}
          title="Thêm người dùng mới"
        >
          <UserPlus className="w-6 h-6" />
          Thêm người dùng
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead>
            <tr className="bg-sky-100 text-sky-900 font-semibold uppercase tracking-wide select-none">
              <th className="py-3 px-6 border-b border-sky-300">ID</th>
              <th className="py-3 px-6 border-b border-sky-300">Tên người dùng</th>
              <th className="py-3 px-6 border-b border-sky-300">Họ tên</th>
              <th className="py-3 px-6 border-b border-sky-300">Mật khẩu</th>
              <th className="py-3 px-6 border-b border-sky-300">Điện thoại</th>
              <th className="py-3 px-6 border-b border-sky-300">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className="bg-white shadow-sm rounded-lg hover:bg-sky-50 transition-colors cursor-default"
              >
                <td className="py-3 px-6 border-b border-sky-100">{user.id}</td>
                <td className="py-3 px-6 border-b border-sky-100 font-medium">{user.username}</td>
                <td className="py-3 px-6 border-b border-sky-100">{user.fullname}</td>
                <td className="py-3 px-6 border-b border-sky-100 font-mono text-gray-600">{user.password}</td>
                <td className="py-3 px-6 border-b border-sky-100">{user.phone}</td>
                <td className="py-3 px-6 border-b border-sky-100 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-sky-900 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleAddUser}
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-lg w-full flex flex-col gap-6"
          >
            <h2 className="text-3xl font-bold text-sky-600 text-center select-none">
              ➕ Thêm người dùng mới
            </h2>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Tên người dùng"
              className="border-2 border-sky-300 rounded-lg px-4 py-3 text-gray-800 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              required
              autoFocus
            />
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Họ tên"
              className="border-2 border-sky-300 rounded-lg px-4 py-3 text-gray-800 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="border-2 border-sky-300 rounded-lg px-4 py-3 text-gray-800 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Điện thoại"
              className="border-2 border-sky-300 rounded-lg px-4 py-3 text-gray-800 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border-2 border-sky-300 rounded-lg px-4 py-3 text-gray-800 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              required
            >
              <option value="" disabled>Chọn vai trò</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <div className="flex justify-end gap-5 mt-3">
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                onClick={() => setModalOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
