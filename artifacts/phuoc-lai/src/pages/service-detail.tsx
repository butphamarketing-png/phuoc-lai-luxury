import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import DetailBody from "@/components/DetailBody";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useServiceDetail } from "@/hooks/useSiteData";
import { resolveMediaUrl } from "@/lib/media";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo-schema";
import { useMemo } from "react";

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const { data, isLoading } = useServiceDetail(slug);

  usePageMeta(
    data
      ? {
          title: data.seo?.title || `${data.title} | Phuoc Lai Luxury`,
          description: (data.seo?.description || data.metaDescription || data.intro).slice(0, 160),
          keywords: data.seo?.keywords,
          path: `/dich-vu/${slug}`,
          image: data.image,
        }
      : null,
  );

  const jsonLd = useMemo(() => {
    if (!data) return [];
    const path = `/dich-vu/${slug}`;
    return [
      breadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Dịch vụ", path: "/dich-vu" },
        { name: data.title, path },
      ]),
      articleSchema({
        headline: data.title,
        description: data.seo?.description || data.metaDescription || data.intro,
        path,
        image: data.image,
        author: data.author,
      }),
    ];
  }, [data, slug]);

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
          <h1 className="text-3xl font-serif mb-4">Không tìm thấy dịch vụ</h1>
          <p className="text-white/50 mb-8">Dịch vụ bạn đang tìm không tồn tại hoặc đã được di chuyển.</p>
          <Link href="/dich-vu">
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
      <JsonLd data={jsonLd} />
      <Navbar />

      <section className="relative pt-40 pb-20 bg-[#111] text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/dich-vu">
            <span className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all cursor-pointer group">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={14} />
              </span>
              Quay lại dịch vụ
            </span>
          </Link>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.45em] font-bold text-white/40 mb-5 block"
          >
            {data.category}
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
            <span>{data.author}</span>
            <span>{data.readTime}</span>
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
          <DetailBody intro={data.intro} bodyHtml={data.bodyHtml} />

          <div className="mt-16 pt-12 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/lien-he">
              <span className="rounded-full bg-[#111] text-white px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:scale-105 transition-transform cursor-pointer">
                Đặt lịch tư vấn ngay
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
