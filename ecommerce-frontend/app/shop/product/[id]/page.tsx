import ProductDetailClient from '@/components/ProductDetailClient';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:5091/api/products/${params.id}`, { cache: 'no-store' });

  if (!res.ok) {
    return <div className="p-8 text-red-600">Không tìm thấy sản phẩm.</div>;
  }

  const product = await res.json();

  const relatedRes = await fetch(`http://localhost:5091/api/products/category/${product.categoryId}`, { cache: 'no-store' });
  const relatedProducts = relatedRes.ok ? await relatedRes.json() : [];

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
