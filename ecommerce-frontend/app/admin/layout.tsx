import React from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function AdminLayout( 
    {children} : {children : React.ReactNode}){
        return (
            <div className='flex h-screen'>
                {/* Chèn Sidebar */}
                <Sidebar />

                <div className='flex-1'>
                    {/* Chèn Navbar */}
                    <Navbar />

                    {/* Chèn nội dung các trang trong admin */}
                    <main className='p-4'>{children}</main>
                </div>
            </div>
        )
}