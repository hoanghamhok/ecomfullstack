'use client';

import React, { useEffect, useState } from 'react';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/app/services/api';

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
    <div className="pt-16 ml-60 px-6 py-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl text-black font-bold mb-4">QUẢN LÝ NHÓM SẢN PHẨM</h1>

      {/* Form thêm, sửa nhóm sản phẩm */}
      <div className="mb-4">
        <input
          type="text"
          className="border text-black p-2 mr-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên nhóm sản phẩm"
        />
        <input
          type="text"
          className="border text-black p-2 mr-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả nhóm sản phẩm"
        
        />
        {isEditing ? (
          <button
            onClick={handleUpdateCategory}
            className="bg-yellow-500 text-white px-4 py-2"
          >
            Cập nhật
          </button>
        ) : (
          <button
            type='button'
            onClick={handleCreateCategory}
            className="bg-yellow-500 text-white px-4 py-2"
          >
            Thêm nhóm sản phẩm
          </button>
        )}
      </div>

      {/* Danh sách nhóm sản phẩm */}
      {/* Danh sách nhóm sản phẩm dạng bảng */}
<div className="mt-4">
  <h2 className="font-semibold text-black mb-2">Danh sách nhóm sản phẩm</h2>
  <table className="w-full text-left border border-gray-300 bg-white">
    <thead>
      <tr className="bg-gray-100 text-black text-center">
        <th className="px-4 py-2 border-r">STT</th>
        <th className="px-4 py-2 border-r">Tên nhóm sản phẩm</th>
        <th className="px-4 py-2 border-r">Miêu tả</th>
        <th className="px-4 py-2">Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category, index) => (
        <tr key={category.id} className="border-t text-black">
          <td className="px-4 py-2 border-r text-center">{index + 1}</td>
          <td className="px-4 py-2 border-r">{category.name}</td>
          <td className="px-4 py-2 border-r">{category.description}</td>
          <td className="text-center align-middle">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handleEditCategory(category)}
              className="text-yellow-600 hover:underline"
            >Sửa
            </button>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="text-red-600 hover:underline"
            >Xóa
            </button>
          </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}
