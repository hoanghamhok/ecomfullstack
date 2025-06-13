// components/PromoBanner.tsx
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="relative bg-gradient-to-r from-pink-200 via-yellow-100 to-emerald-100 py-12 mb-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
        <img
          src="images/promo.png"
          alt="Khuyến mãi lớn"
          className="w-72 h-72 object-contain rounded-2xl shadow-xl"
        />
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Săn deal cực sốc mỗi tuần!</h2>
          <p className="text-lg text-slate-600 mb-6">
            Ưu đãi giảm giá lên đến <span className="text-pink-500 font-bold">50%</span> cho hàng trăm sản phẩm công nghệ, thời trang, phụ kiện.
          </p>
          <Link
            href="/deals"
            className="inline-block bg-gradient-to-r from-pink-500 to-emerald-400 text-white px-8 py-4 rounded-xl font-bold hover:from-pink-600 hover:to-emerald-500 transition-all duration-200 shadow-lg"
          >
            Xem tất cả khuyến mãi
          </Link>
        </div>
      </div>
    </section>
  );
}
