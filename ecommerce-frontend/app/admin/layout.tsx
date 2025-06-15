// app/admin/layout.tsx
'use client';

import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSideBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminNavbar />
      <div className="flex pt-14 h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
