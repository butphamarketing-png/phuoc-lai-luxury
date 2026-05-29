import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { usePublicServices } from "@/hooks/use-site-content";
import type { SiteService } from "@/data/catalog";

const CATEGORY_META = {
  "phun-xam": {
    id: "phun-xam",
    label: "Phun Xăm",
    eyebrow: "PERMANENT MAKEUP",
    title: "Phun xăm thẩm mỹ",
    description:
      "Điêu khắc sợi, phun môi, phun mày và các kỹ thuật permanent makeup chuẩn Châu Âu.",
    banner: "/amazingbrows/Permanent Makeup.jpg",
  },
  spa: {
    id: "spa",
    label: "Spa",
    eyebrow: "SPA & SKINCARE",
    title: "Spa & chăm sóc da",
    description:
      "Chăm sóc da chuyên sâu, trị mụn, triệt lông và liệu trình phục hồi da tại Vũng Tàu.",
    banner: "/spa123.png",
  },
} as const;

function scrollToServiceSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const offset = 96;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function resolveFocusSection(path: string): string | null {
  const hash = window.location.hash.replace("#", "");
  if (hash === "phun-xam" || hash === "spa") return hash;
  if (path.includes("/phun-xam")) return "phun-xam";
  if (path === "/dich-vu/spa" || path.endsWith("/spa")) return "spa";
  return null;
}

function ServiceGrid({
  services,
  isLoading,
  emptyMessage,
}: {
  services: SiteService[];
  isLoading: boolean;
  emptyMessage: string;
}) {
  return (
    <>
      {isLoading && (
        <p className="text-center text-foreground/40 text-sm py-20">Đang tải dịch vụ...</p>
      )}

      {!isLoading && services.length === 0 && (
        <p className="text-center text-foreground/40 text-sm py-20">{emptyMessage}</p>
      )}

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.04 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all duration-500 h-full"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black shrink-0">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
              />
              {service.bullets.length > 0 && (
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
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow z-10 relative">
              <h2 className="min-h-16 font-serif text-xl leading-tight mb-6">
                {service.title}
              </h2>
              <Link
                href={`/dich-vu/${service.slug}`}
                className="mt-auto flex items-center justify-between border-t border-border/60 pt-6 cursor-pointer group/btn"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/45 group-hover/btn:text-foreground font-bold transition-colors whitespace-nowrap">
                  Xem bài viết chi tiết
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 group-hover/btn:bg-primary group-hover/btn:text-primary-foreground transition-all duration-500 shadow-sm">
                  <Plus size={16} />
                </span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}

function ServiceCategorySection({
  meta,
  services,
  isLoading,
}: {
  meta: (typeof CATEGORY_META)[keyof typeof CATEGORY_META];
  services: SiteService[];
  isLoading: boolean;
}) {
  return (
    <section id={meta.id} className="scroll-mt-28">
      <div className="mb-10 max-w-2xl">
        <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
          {meta.eyebrow}
        </span>
        <h2 className="font-serif text-3xl leading-tight text-foreground md:text-5xl">
          {meta.title}
        </h2>
        <p className="mt-4 text-sm font-light leading-relaxed text-foreground/60 md:text-base">
          {meta.description}
        </p>
      </div>

      <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-2xl border border-border/60 bg-black shadow-lg">
        <img
          src={meta.banner}
          alt={meta.title}
          className="h-full w-full object-cover opacity-90"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <ServiceGrid
        services={services}
        isLoading={isLoading}
        emptyMessage={`Chưa có dịch vụ ${meta.label.toLowerCase()}. Vui lòng quay lại sau hoặc liên hệ hotline.`}
      />
    </section>
  );
}

export default function Services() {
  const [location] = useLocation();
  const { data: phunXamServices = [], isLoading: loadingPhunXam } =
    usePublicServices("phun-xam");
  const { data: spaServices = [], isLoading: loadingSpa } =
    usePublicServices("spa");

  useEffect(() => {
    const focus = resolveFocusSection(location);
    if (!focus) return;

    const timer = window.setTimeout(() => scrollToServiceSection(focus), 200);
    return () => window.clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    const onHashChange = () => {
      const focus = resolveFocusSection(location);
      if (focus) scrollToServiceSection(focus);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [location]);

  return (
    <div className="bg-background pt-28 pb-24 text-foreground">
      <section className="px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 block text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/45"
        >
          DỊCH VỤ
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-4xl font-serif text-4xl leading-tight md:text-6xl"
        >
          Dịch vụ làm đẹp được thiết kế riêng
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-foreground/60 md:text-base">
          Các dịch vụ tại Phuoc Lai được xây dựng theo từng nhu cầu cụ thể, giúp bạn tỏa sáng với vẻ đẹp tự nhiên nhất.
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="#phun-xam"
            onClick={(e) => {
              e.preventDefault();
              scrollToServiceSection("phun-xam");
            }}
            className="rounded-full border border-border/60 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
          >
            Phun xăm
          </a>
          <a
            href="#spa"
            onClick={(e) => {
              e.preventDefault();
              scrollToServiceSection("spa");
            }}
            className="rounded-full border border-border/60 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
          >
            Spa
          </a>
        </div>
      </section>

      <section className="container mx-auto mt-20 max-w-7xl space-y-28 px-6 md:space-y-36">
        <ServiceCategorySection
          meta={CATEGORY_META["phun-xam"]}
          services={phunXamServices}
          isLoading={loadingPhunXam}
        />
        <div className="h-px w-full bg-border/60" aria-hidden />
        <ServiceCategorySection
          meta={CATEGORY_META.spa}
          services={spaServices}
          isLoading={loadingSpa}
        />
      </section>
    </div>
  );
}
