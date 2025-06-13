'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5091/api/users/${id}`);;
        if (!res.ok) throw new Error('Lỗi khi gọi API người dùng');
        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Lỗi:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) return <p>Đang tải thông tin...</p>;
  if (!user) return <p className="text-red-500">Không tìm thấy người dùng.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hồ sơ người dùng</h1>
      <p><strong>Tên:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address}</p>
    </div>
  );
}
