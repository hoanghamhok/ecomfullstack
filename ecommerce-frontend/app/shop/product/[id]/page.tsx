import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductWishlistButton from '@/components/ProductWishlistButton';

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

  const relatedRes = await fetch(`http://localhost:5091/api/products/category/${product.categoryId}`, {
    cache: "no-store",
  });

  const relatedProducts = relatedRes.ok ? await relatedRes.json() : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link> &gt;{" "}
        <Link href="/shop/categories" className="hover:text-blue-600">Danh mục</Link> &gt;{" "}
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Chi tiết sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
            className="rounded-lg max-h-[400px] w-full object-contain"
          />
        </div>
        <ProductWishlistButton productId={product.id} />
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-base">{product.description}</p>
          <div className="text-2xl font-semibold text-red-600">
            {product.price.toLocaleString()} ₫
          </div>
          <p className="text-sm text-gray-500">Tình trạng: {product.instock > 0 ? 'Còn hàng' : 'Hết hàng'}</p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm liên quan</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {relatedProducts
            .filter((p: any) => p.id !== product.id)
            .slice(0, 4)
            .map((p: any) => (
              <Link
                key={p.id}
                href={`/shop/product/${p.id}`}
                className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col"
              >
                <img
                  src={p.imageUrl || "https://via.placeholder.com/200"}
                  alt={p.name}
                  className="rounded-md h-40 object-contain mb-3"
                />
                <h3 className="text-gray-800 font-medium">{p.name}</h3>
                <p className="text-red-500 text-sm font-semibold mt-1">
                  {p.price.toLocaleString()} ₫
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
