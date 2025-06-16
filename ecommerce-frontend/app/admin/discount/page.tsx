'use client';

import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '@/app/services/api';
import { Plus, Percent, BadgeDollarSign, ShoppingBag } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
};

export default function PromotionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    discount: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(res => setProducts(res.data as any))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discount' ? Number(value) : value,
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.name.trim() === '') {
      alert('⚠️ Tên sản phẩm không được để trống');
      return;
    }
    if (form.price <= 0) {
      alert('⚠️ Giá sản phẩm phải lớn hơn 0');
      return;
    }
    if (form.discount < 0 || form.discount > 100) {
      alert('⚠️ Khuyến mãi phải từ 0 đến 100 (%)');
      return;
    }

    createProduct(form)
      .then(newProduct => {
        setProducts(prev => [...prev, newProduct.data] as any);
        setModalOpen(false);
        setForm({ name: '', price: 0, discount: 0 });
      })
      .catch(err => alert('❌ Tạo sản phẩm lỗi: ' + err.message));
  };

  return (
    <div className="ml-60 pt-24 bg-gray-50  min-h-screen font-sans text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black-500 flex items-center gap-2">
          🎁 Quản lý khuyến mãi
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
        >
          <Plus size={20} />
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
  <table className="min-w-full text-left text-sm text-gray-800">
    <thead className="bg-gray-100 text-gray-700 uppercase font-bold">
      <tr>
        <th className="py-3 px-6">ID</th>
        <th className="py-3 px-6">Tên sản phẩm</th>
        <th className="py-3 px-6">Giá</th>
        <th className="py-3 px-6">Giảm giá</th>
      </tr>
    </thead>
    <tbody>
      {products.map(({ id, name, price, discount }) => (
        <tr
          key={id}
          className="border-b border-gray-200 hover:bg-blue-100 transition-colors"
        >
          <td className="py-3 px-6 align-middle">{id}</td>
          <td className="py-3 px-6 align-middle">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-400" />
              <span>{name}</span>
            </div>
          </td>
          <td className="py-3 px-6 align-middle">
            <div className="flex items-center gap-1">
              <BadgeDollarSign className="w-4 h-4 text-green-500" />
              <span>{price.toLocaleString('vi-VN')}₫</span>
            </div>
          </td>
          <td className="py-3 px-6 align-middle">
            <div className="flex items-center gap-1">
              <Percent className="w-4 h-4 text-red-400" />
              <span>{discount}%</span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <form
            onSubmit={handleAddProduct}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl flex flex-col gap-5 border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-blue-500 text-center">
              ➕ Thêm sản phẩm mới
            </h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="📝 Tên sản phẩm"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <input
              type="number"
              name="price"
              value={form.price || ''}
              onChange={handleChange}
              placeholder="💵 Giá sản phẩm (VNĐ)"
              min={0}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <input
              type="number"
              name="discount"
              value={form.discount || ''}
              onChange={handleChange}
              placeholder="🏷️ Khuyến mãi (%)"
              min={0}
              max={100}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                ❌ Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                ✅ Thêm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
