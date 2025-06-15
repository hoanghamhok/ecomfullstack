import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { WishlistButton } from "@/components/WishlistButton";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = params;

  const productRes = await fetch(`http://localhost:5091/api/products/${id}`, {
    cache: "no-store",
  });

  if (!productRes.ok) {
    return <div className="p-8 text-red-600">Không tìm thấy sản phẩm.</div>;
  }

  const product = await productRes.json();

  const relatedRes = await fetch(`http://localhost:5091/api/products/related/${product.id}`, {
    cache: "no-store",
  });

  const relatedProducts = relatedRes.ok ? await relatedRes.json() : [];

  const priceAfterDiscount = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

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
        <div className="flex justify-center items-center relative">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
            className="rounded-lg max-h-[400px] w-full object-contain"
          />
          <div className="absolute top-2 right-2">
            <WishlistButton 
              productId={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.imageUrl || "https://via.placeholder.com/400",
                category: product.category,
                description: product.description
              }}
              className="bg-white shadow-md"
            />
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>
          <p className="text-gray-600 text-base">{product.description}</p>
          
          <div className="text-2xl font-semibold text-red-600">
            {priceAfterDiscount.toLocaleString()} ₫
          </div>
          {product.discount && (
            <p className="text-sm text-gray-500 line-through">
              {product.price.toLocaleString()} ₫
            </p>
          )}
          
          <p className="text-sm text-gray-500">
            Tình trạng: {product.instock > 0 ? 'Còn hàng' : 'Hết hàng'}
          </p>
          
          <div className="space-y-3">
            <AddToCartButton productId={product.id} />
            <WishlistButton 
              productId={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.imageUrl || "https://via.placeholder.com/400",
                category: product.category,
                description: product.description
              }}
              variant="button"
              className="w-full justify-center"
            />
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm liên quan</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {relatedProducts.map((p: any) => (
            <div key={p.id} className="relative">
              <Link
                href={`/shop/product/${p.id}`}
                className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col block"
              >
                <img
                  src={p.imageUrl || "https://via.placeholder.com/200"}
                  alt={p.name}
                  className="rounded-md h-40 object-contain mb-3"
                />
                <h3 className="text-gray-800 font-medium">{p.name}</h3>
                <p className="text-red-500 text-sm font-semibold mt-1">
                  {(p.discount
                    ? Math.round(p.price * (1 - p.discount / 100))
                    : p.price
                  ).toLocaleString()} ₫
                </p>
              </Link>
              <div className="absolute top-2 right-2">
                <WishlistButton 
                  productId={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.imageUrl || "https://via.placeholder.com/200",
                    category: p.category,
                    description: p.description
                  }}
                  className="bg-white shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
