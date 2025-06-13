// components/FAQSection.tsx
"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Làm thế nào để đặt hàng?",
    a: "Bạn chỉ cần chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn.",
  },
  {
    q: "Tôi có thể đổi trả sản phẩm không?",
    a: "GoCart hỗ trợ đổi trả trong vòng 7 ngày với điều kiện sản phẩm còn nguyên tem, hộp.",
  },
  {
    q: "Có những hình thức thanh toán nào?",
    a: "Bạn có thể thanh toán qua thẻ, ví điện tử, chuyển khoản hoặc thanh toán khi nhận hàng.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Câu hỏi thường gặp</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-5">
            <button
              className="flex items-center justify-between w-full text-left font-semibold text-lg text-blue-700"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              {faq.q}
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${open === idx ? "rotate-180" : ""}`} />
            </button>
            {open === idx && (
              <div className="mt-3 text-slate-600 text-base">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
