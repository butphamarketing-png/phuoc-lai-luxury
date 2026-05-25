import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronLeft,
  Clock,
  User,
  Calendar,
  Share2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  usePublicServices,
  useServiceDetail,
} from "@/hooks/use-site-content";
import { useSeo } from "@/hooks/use-seo";
import { getPublicServicePath } from "@/data/catalog";
import JsonLd from "@/components/seo/JsonLd";
import DetailBody from "@/components/content/DetailBody";
import { buildServiceJsonLd, formatTitle } from "@/lib/seo";

export default function ServiceDetail() {
  const [, params] = useRoute("/dich-vu/:slug");
  const slug = params?.slug || "";
  const { data, isLoading } = useServiceDetail(slug);
  const { data: related = [] } = usePublicServices();

  useSeo(
    data
      ? {
          title: formatTitle(data.seo?.title || data.title),
          description: (
            data.seo?.description ||
            data.metaDescription ||
            data.intro
          ).slice(0, 160),
          keywords: data.seo?.keywords,
          path: `/dich-vu/${slug}`,
          image: data.image,
          type: "article",
        }
      : null,
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20">
        <p className="text-black/40 text-sm uppercase tracking-widest">
          Đang tải...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Không tìm thấy dịch vụ</h1>
          <p className="text-black/50 mb-8">
            Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Button asChild className="rounded-full bg-black text-white px-8">
            <Link href="/dich-vu">Quay lại danh sách</Link>
          </Button>
        </div>
      </div>
    );
  }

  const sidebarItems = related.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <div className="bg-white text-[#1A1A1A]">
      <JsonLd
        id="service-detail"
        data={buildServiceJsonLd(
          data.title,
          data.intro,
          `/dich-vu/${slug}`,
          data.image,
        )}
      />
      <section className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute bottom-12 left-0 w-full px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/dich-vu"
                className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-all group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 group-hover:bg-black group-hover:text-white transition-all">
                  <ChevronLeft size={14} />
                </span>
                Quay lại dịch vụ
              </Link>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">
                {data.category}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl">
                {data.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12 flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-black/40 border-b border-black/5 pb-10"
            >
              <span className="flex items-center gap-3">
                <Calendar size={14} className="text-black/20" /> {data.date}
              </span>
              <span className="flex items-center gap-3">
                <User size={14} className="text-black/20" /> {data.author}
              </span>
              <span className="flex items-center gap-3">
                <Clock size={14} className="text-black/20" /> {data.readTime}
              </span>
            </motion.div>

            <DetailBody
              intro={data.intro}
              bodyHtml={data.bodyHtml}
              sections={data.sections}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-20 border-t border-black/5 pt-12 flex flex-col sm:flex-row items-center justify-between gap-8"
            >
              <div className="flex gap-6">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-black/5 hover:bg-black hover:text-white transition-all shadow-sm"
                >
                  <Share2 size={18} />
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-black/5 hover:bg-black hover:text-white transition-all shadow-sm"
                >
                  <MessageSquare size={18} />
                </button>
              </div>
              <Button
                asChild
                className="rounded-full bg-black px-12 py-7 text-[11px] uppercase tracking-[0.3em] text-white hover:bg-black/90 luxury-shadow"
              >
                <Link href="/lien-he">Đặt lịch tư vấn ngay</Link>
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-12">
              <div className="rounded-3xl bg-[#FAFAFA] p-10 border border-black/[0.03] luxury-shadow">
                <h3 className="font-serif text-2xl mb-8 uppercase tracking-wider">
                  Dịch vụ khác
                </h3>
                <div className="space-y-8">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={getPublicServicePath(item.slug)}
                      className="group block"
                    >
                      <span className="block text-[10px] uppercase tracking-[0.4em] text-black/30 mb-2 font-bold">
                        {item.categoryLabel}
                      </span>
                      <h4 className="text-base font-serif leading-tight group-hover:text-black/50 transition-colors">
                        {item.title}
                      </h4>
                      <div className="mt-4 h-px w-0 bg-black/10 group-hover:w-full transition-all duration-500" />
                    </Link>
                  ))}
                </div>
                <Link
                  href="/dich-vu"
                  className="mt-12 block text-[10px] uppercase tracking-[0.3em] font-bold border-t border-black/5 pt-8 hover:opacity-50 transition-opacity text-center"
                >
                  Xem tất cả dịch vụ &rarr;
                </Link>
              </div>

              <div className="rounded-3xl bg-[#1A1A1A] p-10 text-white shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-1000 group-hover:scale-150" />
                <h3 className="font-serif text-3xl mb-6 relative z-10">
                  Phuoc Lai Luxury
                </h3>
                <p className="text-[11px] font-light text-white/50 leading-relaxed mb-10 uppercase tracking-[0.2em] relative z-10">
                  Kiến tạo vẻ đẹp độc bản qua từng đường nét nghệ thuật.
                </p>
                <Button
                  asChild
                  className="w-full rounded-full border border-white/20 bg-transparent py-7 text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all relative z-10"
                >
                  <Link href="/ve-chung-toi">Về chúng tôi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
