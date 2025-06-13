// components/BlogPreview.tsx
import Link from "next/link";
import Image from 'next/image';

const posts = [
  {
    id: 1,
    title: "Top 5 điện thoại đáng mua nhất 2025",
    excerpt: "Khám phá những mẫu smartphone nổi bật về hiệu năng, camera và giá bán tốt nhất hiện nay.",
    imageUrl: "/images/top5.png",
    date: "2025-06-10",
  },
  {
    id: 2,
    title: "Bí quyết chọn laptop phù hợp cho sinh viên",
    excerpt: "Những tiêu chí quan trọng khi chọn mua laptop phục vụ học tập, làm việc và giải trí.",
    imageUrl: "/images/tiplaptop.png",
    date: "2025-05-30",
  },
  {
    id: 3,
    title: "Xu hướng thời trang công nghệ năm nay",
    excerpt: "Cập nhật những xu hướng mới nhất về phụ kiện, đồng hồ, thiết bị đeo thông minh.",
    imageUrl: "/images/techfash.png",
    date: "2025-05-15",
  },
];

export default function BlogPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Tin tức & Mẹo hay</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-400 overflow-hidden flex flex-col"
          >
            <Image src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" width={192} height={244}/>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-slate-500 mb-4 flex-1">{post.excerpt}</p>
              {/* <div className="text-xs text-slate-400">{new Date(post.date).toLocaleDateString()}</div> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
