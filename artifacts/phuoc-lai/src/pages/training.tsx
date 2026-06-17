import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CategoryGridCard from "@/components/CategoryGridCard";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { trainingCategories } from "@/data/content";
import { usePublishedCourses } from "@/hooks/useSiteData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useMemo } from "react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo-schema";

export default function Training() {
  const { t } = useLang();
  const { data: liveCourses = [], isLoading } = usePublishedCourses();

  usePageMeta({
    title: "Đào tạo | Phuoc Lai Luxury",
    description: "Chương trình đào tạo phun xăm thẩm mỹ chuyên sâu tại Vũng Tàu — học thật, làm thật, thành công thật.",
    path: "/dao-tao",
  });

  const jsonLd = useMemo(
    () => [
      breadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Đào tạo", path: "/dao-tao" },
      ]),
      webPageSchema({
        name: "Đào tạo",
        description: "Khóa học phun xăm chuyên nghiệp tại Vũng Tàu.",
        path: "/dao-tao",
      }),
    ],
    [],
  );

  const items =
    liveCourses.length > 0
      ? liveCourses.map((c) => ({
          id: c.id,
          title: c.title,
          image: c.image,
          children: c.bullets.length > 0 ? c.bullets : [c.duration, c.level].filter(Boolean),
          href: `/dao-tao/${c.slug}`,
        }))
      : trainingCategories.map((cat) => ({
          id: cat.id,
          title: cat.title,
          image: cat.image,
          children: cat.children,
          href: undefined as string | undefined,
        }));

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white w-full overflow-x-hidden">
      <JsonLd data={jsonLd} />
      <Navbar />

      <section className="relative pt-40 pb-20">
        <motion.div
          className="container mx-auto px-6 max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] font-bold text-white/40 mb-5 block">
                CHƯƠNG TRÌNH ĐÀO TẠO
              </span>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                {t.trainingPage.title}
              </h1>
              <p className="text-white/50 font-light text-sm leading-relaxed max-w-lg">
                Rê chuột vào từng ô để xem các khóa học con. Học thật – Làm thật – Thành công thật cùng Master Phước Lài.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden border border-white/10">
              <img src="/instructor.png" alt="Đào tạo PMU" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="pb-28">
        <motion.div
          className="container mx-auto px-6 max-w-7xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {isLoading && liveCourses.length === 0 ? (
            <p className="text-center text-white/40 text-sm uppercase tracking-widest py-20">Đang tải...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {items.map((cat, idx) => (
                <CategoryGridCard
                  key={cat.id}
                  title={cat.title}
                  image={cat.image}
                  children={cat.children}
                  index={idx}
                  dark
                  href={cat.href}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
