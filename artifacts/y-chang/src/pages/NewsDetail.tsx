import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useSeo } from "@/hooks/use-seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  formatTitle,
} from "@/lib/seo";
import {
  getAllNewsArticles,
  getNewsArticle,
  getNewsByLang,
} from "@/data/news";
import BookingModal from "@/components/layout/BookingModal";
import { useState } from "react";

export default function NewsDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const { language } = useLanguage();
  const langKey = language === "en" ? "en" : "vn";
  const [bookingOpen, setBookingOpen] = useState(false);

  const article = useMemo(() => {
    return (
      getNewsArticle(langKey, slug) ||
      getAllNewsArticles().find((a) => a.slug === slug)
    );
  }, [langKey, slug]);

  const related = useMemo(() => {
    if (!article) return [];
    return getNewsByLang(article.lang === "en" ? "en" : "vn")
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3);
  }, [article]);

  useSeo(
    article
      ? {
          title: article.title.includes("Phuoc Lai")
            ? article.title
            : formatTitle(article.title),
          description: article.description,
          keywords: article.keywords || article.keyword,
          path: `/tin-tuc/${article.slug}`,
          image: article.image,
        }
      : {
          title: formatTitle(language === "en" ? "Article not found" : "Không tìm thấy bài viết"),
          path: `/tin-tuc/${slug}`,
        },
  );

  const jsonLd = useMemo(() => {
    if (!article) return [];
    const path = `/tin-tuc/${article.slug}`;
    const isVi = article.lang !== "en";
    return [
      buildBreadcrumbJsonLd([
        { name: isVi ? "Trang chủ" : "Home", path: "/" },
        { name: isVi ? "Tin tức" : "News", path: "/tin-tuc" },
        { name: article.keyword, path },
      ]),
      buildArticleJsonLd({
        headline: article.h1 || article.title,
        description: article.description,
        path,
        image: article.image,
        datePublished: article.date,
        author: article.author,
      }),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ];
  }, [article]);

  if (!article) {
    return (
      <div className="bg-background text-foreground min-h-screen px-8 md:px-20 pt-40 pb-32 text-center">
        <h1 className="font-serif text-3xl mb-4">
          {language === "en" ? "Article not found" : "Không tìm thấy bài viết"}
        </h1>
        <Link href="/tin-tuc">
          <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/60 cursor-pointer hover:text-foreground">
            {language === "en" ? "← Back to News" : "← Quay lại Tin tức"}
          </span>
        </Link>
      </div>
    );
  }

  const isVi = article.lang !== "en";
  const tags = article.secondaryKeywords?.slice(0, 8) ?? [article.keyword];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <JsonLd id="news-detail" data={jsonLd} />

      <article className="px-8 md:px-20 pt-32 pb-20 max-w-4xl mx-auto">
        <Link href="/tin-tuc">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-foreground/45 hover:text-foreground cursor-pointer mb-8">
            <ArrowLeft size={12} />
            {isVi ? "Tin tức" : "News"}
          </span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <time className="text-[9px] uppercase tracking-[0.22em] text-foreground/40" dateTime={article.date}>
              {article.date}
            </time>
            <span className="w-1 h-1 rounded-full bg-foreground/25" />
            <span className="text-[9px] uppercase tracking-[0.22em] text-foreground/55">
              {article.category}
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/35 mb-3">
            {isVi ? "Từ khóa chính" : "Focus keyword"}: {article.keyword}
          </p>

          <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-6">
            {article.h1 || article.title}
          </h1>
          <p className="text-sm font-light text-foreground/60 leading-relaxed mb-6">
            {article.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 border border-border/60 text-foreground/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="aspect-[16/9] overflow-hidden mb-12 bg-card border border-border/40">
          <img
            src={article.image}
            alt={article.imageAlt || `${article.keyword} — Phuoc Lai Luxury`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl mb-4">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="text-sm font-light leading-[1.85] text-foreground/70 mb-4"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {article.faqs?.length > 0 && (
          <section className="mt-14 pt-10 border-t border-border/60">
            <h2 className="font-serif text-2xl mb-6">
              {isVi
                ? `Câu hỏi thường gặp về ${article.keyword}`
                : `FAQ about ${article.keyword}`}
            </h2>
            <div className="space-y-5">
              {article.faqs.map((faq) => (
                <div key={faq.q} className="border border-border/60 bg-card p-5">
                  <h3 className="text-[13px] font-medium mb-2">{faq.q}</h3>
                  <p className="text-[13px] font-light text-foreground/60 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 p-8 bg-[#1C1C1C] text-center text-white">
          <p className="font-serif text-xl mb-5">{article.cta}</p>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-white text-[#1C1C1C] hover:bg-white/90 transition-colors"
          >
            BOOKING
          </button>
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-8 md:px-20 pb-24 border-t border-border/60 pt-16">
          <h2 className="font-serif text-2xl mb-8 text-center">
            {isVi ? "Bài viết liên quan" : "Related articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {related.map((item) => (
              <Link key={item.id} href={`/tin-tuc/${item.slug}`}>
                <div className="border border-border/60 bg-card cursor-pointer group overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.keyword}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
                      {item.keyword}
                    </p>
                    <h3 className="font-serif text-lg leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
