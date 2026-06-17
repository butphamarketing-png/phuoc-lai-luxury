import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import DetailBody from "@/components/DetailBody";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useTrainingDetail } from "@/hooks/useSiteData";
import { resolveMediaUrl } from "@/lib/media";

export default function TrainingDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const { data, isLoading } = useTrainingDetail(slug);

  usePageMeta(
    data
      ? {
          title: data.seo?.title || `${data.title} | Phuoc Lai Luxury`,
          description: (data.seo?.description || data.metaDescription || data.intro).slice(0, 160),
          keywords: data.seo?.keywords,
          path: `/dao-tao/${slug}`,
          image: data.image,
        }
      : null,
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#111] text-white w-full overflow-x-hidden">
        <Navbar />
        <div className="pt-40 pb-32 text-center text-white/40 text-sm uppercase tracking-widest">
          Đang tải...
        </div>
        <Footer />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#111] text-white w-full overflow-x-hidden">
        <Navbar />
        <div className="pt-40 pb-32 text-center">
          <h1 className="text-3xl font-serif mb-4">Không tìm thấy khóa học</h1>
          <p className="text-white/50 mb-8">Khóa học bạn đang tìm không tồn tại hoặc đã được di chuyển.</p>
          <Link href="/dao-tao">
            <span className="rounded-full bg-white text-black px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer">
              Quay lại danh sách
            </span>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfdfb] text-[#1a1a1a] w-full overflow-x-hidden">
      <Navbar />

      <section className="relative pt-40 pb-20 bg-[#111] text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/dao-tao">
            <span className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all cursor-pointer group">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={14} />
              </span>
              Quay lại đào tạo
            </span>
          </Link>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.45em] font-bold text-white/40 mb-5 block"
          >
            {data.level}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-[1.1]"
          >
            {data.title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40 border-t border-white/10 pt-8"
          >
            <span>{data.date}</span>
            <span>{data.instructor}</span>
            <span>{data.duration}</span>
          </motion.div>
        </div>
      </section>

      {data.image ? (
        <div className="container mx-auto px-6 max-w-4xl -mt-8 relative z-10">
          <img
            src={resolveMediaUrl(data.image)}
            alt={data.title}
            className="w-full aspect-[16/9] object-cover shadow-2xl"
          />
        </div>
      ) : null}

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {data.curriculum.length > 0 ? (
            <div className="mb-16 rounded-3xl bg-[#FAFAFA] p-8 md:p-10 border border-black/[0.03]">
              <h3 className="font-serif text-2xl mb-8 text-[#1a1a1a]">Nội dung chương trình</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.curriculum.map((item) => (
                  <div key={item} className="flex items-start gap-4 text-sm font-light text-[#1a1a1a]/70">
                    <span className="text-[#1a1a1a]/20 shrink-0">—</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <DetailBody intro={data.intro} bodyHtml={data.bodyHtml} />

          <div className="mt-16 pt-12 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/lien-he">
              <span className="rounded-full bg-[#111] text-white px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:scale-105 transition-transform cursor-pointer">
                Đăng ký tư vấn khóa học
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
