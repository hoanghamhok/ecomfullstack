import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const productRes = await fetch(`http://localhost:5091/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!productRes.ok) {
    return <div className="p-8 text-red-600">Không tìm thấy sản phẩm.</div>;
  }

  const product = await productRes.json();

  // Lấy danh sách sản phẩm liên quan (theo categoryId)
  const relatedRes = await fetch(`http://localhost:5091/api/products/category/${product.categoryId}`, {
    cache: "no-store",
  });

  const relatedProducts = relatedRes.ok ? await relatedRes.json() : [];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link> &gt;{" "}
        <Link href="/shop/categories" className="hover:text-blue-600">Danh mục</Link> &gt;{" "}
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Chi tiết sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border p-6 rounded-lg shadow">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl text-red-600 font-semibold">
            {product.price.toLocaleString()} VND
          </p>
          <p className="text-gray-500">Kho: {product.instock}</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md transition">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts
            .filter((p: any) => p.id !== product.id)
            .slice(0, 4)
            .map((p: any) => (
              <Link
                href={`/shop/product/${p.id}`}
                key={p.id}
                className="border p-3 rounded-lg hover:shadow-md transition block"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-sm font-medium text-gray-700">{p.name}</h3>
                <p className="text-red-500 font-semibold">{p.price.toLocaleString()} VND</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
