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
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrainingDetail } from "@/hooks/use-site-content";
import { useSeo } from "@/hooks/use-seo";
import JsonLd from "@/components/seo/JsonLd";
import DetailBody from "@/components/content/DetailBody";
import { buildCourseJsonLd, formatTitle } from "@/lib/seo";

export default function TrainingDetail() {
  const [, params] = useRoute("/dao-tao/:slug");
  const slug = params?.slug || "";
  const { data, isLoading } = useTrainingDetail(slug);

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
          path: `/dao-tao/${slug}`,
          image: data.image,
          type: "article",
        }
      : null,
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-20">
        <p className="text-foreground/40 text-sm uppercase tracking-widest">
          Đang tải...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Không tìm thấy khóa học</h1>
          <p className="text-foreground/50 mb-8">
            Chương trình đào tạo này không tồn tại hoặc đã được cập nhật mới.
          </p>
          <Button asChild className="rounded-full bg-primary text-primary-foreground px-8 hover:bg-primary/90">
            <Link href="/dao-tao">Quay lại danh sách</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <JsonLd
        id="training-detail"
        data={buildCourseJsonLd(
          data.title,
          data.intro,
          `/dao-tao/${slug}`,
          data.image,
        )}
      />
      <section className="container mx-auto max-w-4xl px-6 pt-28 pb-24 md:pt-32 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/dao-tao"
            className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground transition-all group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ChevronLeft size={14} />
            </span>
            Quay lại đào tạo
          </Link>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.5em] text-foreground/30">
            {data.level}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            {data.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-foreground/40 border-b border-border/60 pb-10"
        >
          <span className="flex items-center gap-3">
            <Calendar size={14} className="text-foreground/20" /> {data.date}
          </span>
          <span className="flex items-center gap-3">
            <User size={14} className="text-foreground/20" /> {data.instructor}
          </span>
          <span className="flex items-center gap-3">
            <Clock size={14} className="text-foreground/20" /> {data.duration}
          </span>
        </motion.div>

        {data.curriculum.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 rounded-3xl bg-[#FAFAFA] p-10 border border-black/[0.03] luxury-shadow"
          >
            <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
              <BookOpen size={24} className="text-black/20" /> Nội dung
              chương trình
            </h3>
            <div className="grid grid-cols-1 gap-5">
              {data.curriculum.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 text-base font-light text-black/70"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 text-black/20 shrink-0"
                  />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}

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
            <Link href="/lien-he">Đăng ký nhập học ngay</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
