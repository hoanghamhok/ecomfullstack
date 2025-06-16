import React from 'react'
import AdminSidebar from '@/components/AdminSideBar'
import AdminNavbar from '@/components/AdminNavbar'

export default function AdminLayout( 
    {children} : {children : React.ReactNode}){
        return (
            <div className='flex h-screen'>
                {/* Chèn Sidebar */}
                <AdminSidebar />

                <div className='flex-1'>
                    {/* Chèn Navbar */}
                    <AdminNavbar title={''} />

                    {/* Chèn nội dung các trang trong admin */}
                    <main className='p-4'>{children}</main>
                </div>
            </div>
        )
}