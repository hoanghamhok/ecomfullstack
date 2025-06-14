import React from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
// Kiểm tra quyền truy cập của người dùng
export default function AdminLayout( 
    {children} : {children : React.ReactNode}){
        return (
            <div className='flex h-screen'>
                {/* Chèn Sidebar */}
                <Sidebar />

                <div className='flex-1'>
                    {/* Chèn Navbar */}
                    

                    {/* Chèn nội dung các trang trong admin */}
                    <main className='p-4'>{children}</main>
                </div>
            </div>
        )
}