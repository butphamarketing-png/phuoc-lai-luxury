import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { useLang } from "@/context/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo-schema";
import { getAllNewsArticles, getNewsArticle, getNewsByLang } from "@/data/news";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";

export default function NewsDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const { lang } = useLang();
  const [bookingOpen, setBookingOpen] = useState(false);

  const article = useMemo(() => {
    return getNewsArticle(lang, slug) || getAllNewsArticles().find((a) => a.slug === slug);
  }, [lang, slug]);

  const related = useMemo(() => {
    if (!article) return [];
    return getNewsByLang(article.lang)
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3);
  }, [article]);

  usePageMeta(
    article
      ? {
          title: `${article.title} | Phuoc Lai Luxury`,
          description: article.description,
          keywords: article.keyword,
          path: `/tin-tuc/${article.slug}`,
          image: article.image,
        }
      : null,
  );

  const jsonLd = useMemo(() => {
    if (!article) return [];
    const path = `/tin-tuc/${article.slug}`;
    return [
      breadcrumbSchema([
        { name: article.lang === "vi" ? "Trang chủ" : "Home", path: "/" },
        { name: article.lang === "vi" ? "Tin tức" : "News", path: "/tin-tuc" },
        { name: article.title, path },
      ]),
      articleSchema({
        headline: article.title,
        description: article.description,
        path,
        image: article.image,
        author: article.author,
      }),
    ];
  }, [article]);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#ebebeb] w-full overflow-x-hidden">
        <Navbar />
        <div className="pt-40 pb-32 text-center pl-container">
          <h1 className="font-serif text-3xl text-[#1a1a1a] mb-4">
            {lang === "vi" ? "Không tìm thấy bài viết" : "Article not found"}
          </h1>
          <Link href="/tin-tuc">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/60 cursor-pointer hover:text-[#1a1a1a]">
              {lang === "vi" ? "← Quay lại Tin tức" : "← Back to News"}
            </span>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const isVi = article.lang === "vi";

  return (
    <main className="min-h-screen bg-[#ebebeb] w-full overflow-x-hidden">
      <JsonLd data={jsonLd} />
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="pl-container max-w-3xl">
          <Link href="/tin-tuc">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#1a1a1a]/45 hover:text-[#1a1a1a] cursor-pointer mb-8">
              <ArrowLeft size={12} />
              {isVi ? "Tin tức" : "News"}
            </span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#1a1a1a]/40">{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#1a1a1a]/25" />
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#1a1a1a]/55">{article.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#1a1a1a]/25" />
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#1a1a1a]/40">{article.keyword}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-6">
              {article.title}
            </h1>
            <p className="text-[14px] font-light text-[#1a1a1a]/60 leading-relaxed mb-8">
              {article.description}
            </p>
          </motion.div>

          <div className="aspect-[16/9] overflow-hidden mb-12 bg-white">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-[14px] font-light leading-[1.85] text-[#1a1a1a]/70 mb-4"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {article.faqs?.length > 0 && (
            <section className="mt-14 pt-10 border-t border-black/10">
              <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">
                {isVi ? "Câu hỏi thường gặp" : "Frequently asked questions"}
              </h2>
              <div className="space-y-5">
                {article.faqs.map((faq) => (
                  <div key={faq.q} className="bg-white p-5">
                    <h3 className="text-[13px] font-medium text-[#1a1a1a] mb-2">{faq.q}</h3>
                    <p className="text-[13px] font-light text-[#1a1a1a]/60 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 p-8 bg-[#1a1a1a] text-center">
            <p className="font-serif text-xl text-white mb-5">{article.cta}</p>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="pl-btn-booking bg-white text-[#1a1a1a] hover:bg-white/90"
            >
              BOOKING
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pl-container mt-20">
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-8 text-center">
              {isVi ? "Bài viết liên quan" : "Related articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link key={item.id} href={`/tin-tuc/${item.slug}`}>
                  <div className="bg-white cursor-pointer group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-2">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-lg text-[#1a1a1a] leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </main>
  );
}
