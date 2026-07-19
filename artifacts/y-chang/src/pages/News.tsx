import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { getNewsByLang } from "@/data/news";
import { useSeo } from "@/hooks/use-seo";
import { formatTitle } from "@/lib/seo";

const PAGE_SIZE = 12;

export default function News() {
  const { language } = useLanguage();
  const langKey = language === "en" ? "en" : "vn";
  const [page, setPage] = useState(0);

  const articles = useMemo(() => getNewsByLang(langKey), [langKey]);
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const visible = articles.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    setPage(0);
  }, [langKey]);

  useSeo({
    title: formatTitle(language === "en" ? "News" : "Tin tức"),
    description:
      language === "en"
        ? "100 SEO guides on permanent makeup in Vung Tau, Phuoc Hai, AMAZINGBROWS, SEXYLIPS and PMU training at Phuoc Lai Luxury."
        : "100 bài viết SEO về phun xăm Vũng Tàu, Phước Hải, AMAZINGBROWS, SEXYLIPS và đào tạo nghề tại Phuoc Lai Luxury.",
    keywords:
      "tin tức phun xăm vũng tàu, phun mày vũng tàu, phun môi vũng tàu, phuoc lai luxury blog",
    path: "/tin-tuc",
    image: "/training-1.png",
  });

  const heading = language === "en" ? "News" : "Tin tức";
  const sub =
    language === "en"
      ? "PMU insights, beauty trends and updates from Phuoc Lai Luxury"
      : "Kiến thức phun xăm, xu hướng làm đẹp và cập nhật từ Phuoc Lai Luxury";

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="px-8 md:px-20 pt-32 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block uppercase tracking-[0.4em] text-[10px] text-foreground/50 mb-5"
        >
          BLOG & SEO
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight max-w-3xl"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-6 text-foreground/70 font-light text-sm tracking-wide max-w-xl"
        >
          {sub}
        </motion.p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-foreground/35">
          {articles.length} {language === "en" ? "articles" : "bài viết"}
        </p>
      </section>

      <section className="px-8 md:px-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.06 }}
              className="group border border-border/60 bg-card overflow-hidden"
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
                  <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                    {item.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-foreground/25" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/55">
                    {item.category}
                  </span>
                </div>
                <p className="text-[9px] tracking-[0.12em] text-foreground/35 mb-2 line-clamp-1">
                  {item.keyword}
                </p>
                <Link href={`/tin-tuc/${item.slug}`}>
                  <h2 className="font-serif text-xl leading-snug mb-3 cursor-pointer hover:opacity-70 transition-opacity">
                    {item.title}
                  </h2>
                </Link>
                <p className="text-[12px] font-light leading-relaxed text-foreground/55 mb-5 line-clamp-3">
                  {item.description}
                </p>
                <Link href={`/tin-tuc/${item.slug}`}>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/70 hover:text-foreground cursor-pointer">
                    {language === "en" ? "Read more →" : "Đọc tiếp →"}
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-14">
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
                    ? "bg-foreground text-background"
                    : "border border-border text-foreground/60 hover:text-foreground"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
