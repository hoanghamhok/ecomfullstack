'use client';

import React, { useEffect, useState } from 'react';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/app/(site)/services/api';

export default function Category() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data as any[]))
      .catch((err) => console.error('Lỗi khi tải danh sách nhóm sản phẩm', err));
  }, []);

  const handleCreateCategory = () => {
    if (name && description) {
      createCategory({ name, description })
        .then((res) => {
          setCategories([...categories, res.data]);
          setName('');
          setDescription('');
        })
        .catch((err) => console.error('Lỗi khi tạo nhóm sản phẩm', err));
    }
  };

  const handleUpdateCategory = () => {
    if (isEditing && name && description) {
      updateCategory(editCategoryId!, { name, description }).then(() => {
        const updatedCategories = categories.map((category) =>
          category.id === editCategoryId
            ? { ...category, name, description }
            : category
        );
        setCategories(updatedCategories);
        setName('');
        setDescription('');
        setIsEditing(false);
        setEditCategoryId(null);
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa nhóm sản phẩm này?');
    if (!confirmDelete) return;

    deleteCategory(id)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((err) => console.error('Lỗi khi xóa nhóm sản phẩm', err));
  };

  const handleEditCategory = (category: any) => {
    setIsEditing(true);
    setEditCategoryId(category.id);
    setName(category.name);
    setDescription(category.description);
  };

  return (
    <div className="pt-24 pl-72 pr-6 pb-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📂 Quản lý nhóm sản phẩm</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {isEditing ? '✏️ Cập nhật nhóm sản phẩm' : '➕ Thêm nhóm sản phẩm'}
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên nhóm sản phẩm"
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả nhóm sản phẩm"
          />
          {isEditing ? (
            <button
              onClick={handleUpdateCategory}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              ✅ Cập nhật
            </button>
          ) : (
            <button
              onClick={handleCreateCategory}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              ➕ Thêm
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Danh sách nhóm sản phẩm</h2>
        <table className="w-full table-auto border border-gray-300 rounded overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-center">
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Tên nhóm</th>
              <th className="px-4 py-2 border">Mô tả</th>
              <th className="px-4 py-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className="text-center text-gray-800 hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{category.name}</td>
                <td className="px-4 py-2 border">{category.description}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:underline"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Không có nhóm sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
