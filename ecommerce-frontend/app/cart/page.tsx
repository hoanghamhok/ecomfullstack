'use client';
import { useEffect, useState } from "react";   
import { fetchCart, updateCartItem } from "../services/api";

export default function CartPage(){
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    // Hàm lấy danh sách sản phẩm trong giỏ hàng
    useEffect(() => {
        try{
            setLoading(true);
            fetchCart().then((res) => {
                const data = res.data as any[];
                setCartItems(data);
                const total = data.reduce((sum: number, item: any) => {
                    return sum + (item.product.price * item.quantity)
                }, 0);
                setTotal(total);
            });
            
            setLoading(false);
        }catch (err) {
            setError("Lỗi khi tải giỏ hàng. Vui lòng thử lại sau.");            
        }finally{
            setLoading(false);
        }
    }, []);

    const handleUpdateQuantity = async (itemId: number, productId:number, quantity: number) => {
        try{
            if (quantity < 1) {
                alert("Số lượng phải lớn hơn 0");
                return;
            }
            await updateCartItem(productId, quantity);
            setCartItems((prevItems) => 
                prevItems.map((item) => 
                    item.productId === productId ? {...item, quantity} : item
                )
            );
            const newTotal = cartItems.reduce((sum: number, item: any) => {
                return sum + (item.product.price * item.quantity);
            }, 0);
            setTotal(newTotal);
        }
        catch (err) {
            alert("Lỗi khi cập nhật số lượng sản phẩm. Vui lòng thử lại sau.");
        }
    }

    if (loading) {
        return <div className="text-center py-10">Đang tải giỏ hàng...</div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-500">Lỗi khi tải giỏ hàng: {error}</div>;
    }

    const handleCheckout = async () => {
    try {
        const res = await fetch('http://localhost:5091/api/Cart/checkout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await res.text(); // Đọc HTML lỗi
            console.error("Unexpected response (not JSON):", text);
            alert("Lỗi: Server trả về định dạng không hợp lệ.");
            return;
        }

        const data = await res.json();

        if (!res.ok) {
            alert("Lỗi khi thanh toán: " + (data.message || "Lỗi không xác định"));
            return;
        }

        alert("Thanh toán thành công! Mã đơn hàng: " + data.orderId);
        setCartItems([]);
        setTotal(0);
    } catch (error) {
        alert("Lỗi kết nối khi thanh toán.");
    }
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Giỏ hàng của bạn hiện đang trống.</p>
            ) : (
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Sản phẩm</th>
                            <th className="px-4 py-2 text-left">Số lượng</th>
                            <th className="px-4 py-2 text-right">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.product.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{item.product.name}</td>
                                <td className="px-4 py-2">
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        min="1" 
                                        className="w-16 border rounded px-2 py-1 text-center"
                                        onChange={(e) => handleUpdateQuantity(item.id, item.productId, parseInt(e.target.value))}
                                        />
                                </td>
                                <td className="px-4 py-2 text-right">{(item.product.price * item.quantity).toLocaleString()} đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="mt-6 text-right">  
                <span className="font-bold">Tổng tiền: </span>
                <span className="text-xl text-blue-600">{total.toLocaleString()} đ</span>
            </div>
            <div className="mt-6 text-right">
                <span className="font-bold">Tổng tiền: </span>
                <span className="text-xl text-blue-600">{total.toLocaleString()} đ</span>
                <br />
                <button 
                    onClick={handleCheckout}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Thanh toán
                </button>
            </div>
        </div>
    )
}