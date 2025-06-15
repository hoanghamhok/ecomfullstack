'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  imageUrl?: string;
  price: number;
  discount?: number;
}

interface Props {
  productId: number;
}

const RelatedProducts: React.FC<Props> = ({ productId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/Product/related/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch {
        setProducts([]);
      }
      setLoading(false);
    };

    fetchRelated();
  }, [productId]);

  if (loading) return <div>Đang tải sản phẩm liên quan...</div>;
  if (products.length === 0) return <div>Không có sản phẩm liên quan.</div>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border rounded p-3 hover:shadow block"
          >
            <img
              src={product.imageUrl || '/no-image.jpg'}
              alt={product.name || 'Sản phẩm'}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-red-600 font-bold">
              {product.discount
                ? `${(product.price * (1 - product.discount / 100)).toLocaleString()} ₫`
                : `${product.price.toLocaleString()} ₫`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;