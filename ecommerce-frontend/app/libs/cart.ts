// utils/cart.ts
export const addToCart = async ({ productId, quantity }: { productId: number; quantity: number }) => {
  const res = await fetch("http://localhost:5091/api/Cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ productId, quantity })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Thêm giỏ hàng thất bại");
  }

  return res.json();
};

export const handleAddToCart = async (productId: number) => {
  try {
    await addToCart({ productId, quantity: 1 });
    alert("Đã thêm sản phẩm vào giỏ.");
  } catch (err) {
    alert("Lỗi khi thêm sản phẩm vào giỏ.");
  }
};
