import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus } from "lucide-react";
import { useLocation } from "wouter";
import { usePublicServices } from "@/hooks/use-site-content";
import type { ServiceCategory } from "@/data/catalog";
import ServicesCategoryHub from "@/components/services/ServicesCategoryHub";

export default function Services() {
  const [location] = useLocation();
  const category: ServiceCategory | null = location.includes("/phun-xam")
    ? "phun-xam"
    : location.includes("/spa")
      ? "spa"
      : null;

  const { data: filteredServices = [], isLoading } = usePublicServices(
    category ?? undefined,
  );

  if (!category) {
    return (
      <div className="bg-white pt-28 pb-24 text-[#1A1A1A]">
        <ServicesCategoryHub />
      </div>
    );
  }

  const displayTitle =
    category === "phun-xam"
      ? "Dịch vụ Phun Xăm Thẩm Mỹ"
      : "Dịch vụ Spa & Chăm Sóc Da";

  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 text-[#1A1A1A]">
      <section className="px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 block text-[10px] font-medium uppercase tracking-[0.4em] text-black/45"
        >
          {category.replace("-", " ")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-4xl font-serif text-4xl leading-tight md:text-6xl"
        >
          {displayTitle}
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-black/60 md:text-base">
          Các dịch vụ tại Phuoc Lai được xây dựng theo từng nhu cầu cụ thể, giúp bạn tỏa sáng với vẻ đẹp tự nhiên nhất.
        </p>
      </section>

      <section className="container mx-auto mt-20 max-w-7xl px-6">
        {isLoading && (
          <p className="text-center text-black/40 text-sm py-20">
            Đang tải dịch vụ...
          </p>
        )}

        {!isLoading && filteredServices.length === 0 && (
          <p className="text-center text-black/40 text-sm py-20">
            Chưa có dịch vụ trong danh mục này. Vui lòng quay lại sau hoặc liên hệ hotline để được tư vấn.
          </p>
        )}

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredServices.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white text-black shadow-sm hover:shadow-xl transition-all duration-500 h-full"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 p-6 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0 z-20">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-white/45 font-bold">
                    Chi tiết dịch vụ
                  </p>
                  <ul className="space-y-3">
                    {service.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs font-light uppercase tracking-[0.12em] text-white/75"
                      >
                        <span className="h-px w-4 bg-white/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow z-10 relative">
                <h2 className="min-h-16 font-serif text-xl leading-tight mb-6">
                  {service.title}
                </h2>
                <Link
                  href={`/dich-vu/${service.slug}`}
                  className="mt-auto flex items-center justify-between border-t border-black/5 pt-6 cursor-pointer group/btn"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 group-hover/btn:text-black font-bold transition-colors whitespace-nowrap">
                    Xem bài viết chi tiết
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 group-hover/btn:bg-black group-hover/btn:text-white transition-all duration-500 shadow-sm">
                    <Plus size={16} />
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/dich-vu"
            className="text-[11px] uppercase tracking-[0.2em] text-black/45 hover:text-black transition-colors border-b border-black/10 pb-1"
          >
            &larr; Chọn danh mục khác
          </Link>
        </div>
      </section>
    </div>
  );
}
