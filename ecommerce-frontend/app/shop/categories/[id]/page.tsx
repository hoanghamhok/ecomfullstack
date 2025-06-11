import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  instock: number;
  imageUrl?: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
  };
  createdAt: string; // ISO string từ DateTime bên backend
};

type Category = {
  id: number;
  name: string;
  description?: string;
  createdAt: string; // hoặc Date nếu bạn muốn xử lý ngày tháng
};

export default async function ProductsByCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryId = params.id;

  // Gọi API lấy danh mục (để hiện tên)
  const [categoryRes, productsRes] = await Promise.all([
    fetch(`http://localhost:5091/api/categories/${categoryId}`, { cache: "no-store" }),
    fetch(`http://localhost:5091/api/products/category/${categoryId}`, { cache: "no-store" }),
  ]);

  if (!categoryRes.ok || !productsRes.ok) {
    return <div className="p-6 text-red-500">Không thể tải dữ liệu.</div>;
  }

  const category: Category = await categoryRes.json();
  const products: Product[] = await productsRes.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Danh mục: {category.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-green-600 font-bold mb-2">
                {product.price.toLocaleString()} VND
              </p>
              <Link
                href={`/shop/product/${product.id}`}
                className="inline-block mt-2 bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
