import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { useLang } from "@/context/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo-schema";
import { getNewsByLang } from "@/data/news";

const PAGE_SIZE = 12;

export default function News() {
  const { t, lang } = useLang();
  const [page, setPage] = useState(0);

  const articles = useMemo(() => getNewsByLang(lang), [lang]);
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const visible = articles.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    setPage(0);
  }, [lang]);

  usePageMeta({
    title: lang === "vi" ? "Tin tức | Phuoc Lai Luxury" : "News | Phuoc Lai Luxury",
    description:
      lang === "vi"
        ? "100 bài viết SEO về phun xăm Vũng Tàu, Phước Hải, AMAZINGBROWS, SEXYLIPS và đào tạo nghề tại Phuoc Lai Luxury."
        : "100 SEO guides on permanent makeup in Vung Tau, Phuoc Hai, AMAZINGBROWS, SEXYLIPS and PMU training at Phuoc Lai Luxury.",
    path: "/tin-tuc",
  });

  return (
    <main className="min-h-screen bg-[#ebebeb] w-full overflow-x-hidden">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: lang === "vi" ? "Trang chủ" : "Home", path: "/" },
            { name: t.newsPage.title, path: "/tin-tuc" },
          ]),
          webPageSchema({
            name: t.newsPage.title,
            description: t.newsPage.subtitle,
            path: "/tin-tuc",
          }),
        ]}
      />
      <Navbar />

      <section className="pt-36 pb-12">
        <div className="pl-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="pl-label pl-label-light mb-5 block"
          >
            {lang === "vi" ? "BLOG & SEO" : "BLOG & SEO"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-serif text-4xl md:text-6xl text-[#1a1a1a] mb-5"
          >
            {t.newsPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="text-[13px] font-light text-[#1a1a1a]/55 max-w-xl mx-auto leading-relaxed"
          >
            {t.newsPage.subtitle}
          </motion.p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/35">
            {articles.length} {lang === "vi" ? "bài viết" : "articles"}
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="pl-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.06 }}
                className="bg-white group"
              >
                <Link href={`/tin-tuc/${item.slug}`}>
                  <div className="aspect-[4/3] overflow-hidden cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.keyword}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                      {item.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#1a1a1a]/25" />
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/55">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[9px] tracking-[0.12em] text-[#1a1a1a]/35 mb-2 line-clamp-1">
                    {item.keyword}
                  </p>
                  <Link href={`/tin-tuc/${item.slug}`}>
                    <h2 className="font-serif text-xl text-[#1a1a1a] leading-snug mb-3 cursor-pointer hover:opacity-70 transition-opacity">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-[12px] font-light leading-relaxed text-[#1a1a1a]/55 mb-5 line-clamp-3">
                    {item.description}
                  </p>
                  <Link href={`/tin-tuc/${item.slug}`}>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#1a1a1a]/70 hover:text-[#1a1a1a] cursor-pointer">
                      {lang === "vi" ? "Đọc tiếp →" : "Read more →"}
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPage(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`min-w-9 h-9 px-2 text-[11px] tracking-wider transition-colors ${
                    page === i
                      ? "bg-[#1a1a1a] text-white"
                      : "bg-white text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
