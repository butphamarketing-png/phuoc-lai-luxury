import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { Star } from "lucide-react";
import { usePublicReviews } from "@/hooks/use-site-reviews";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Feedback() {
  const { language } = useLanguage();
  const { data: testimonials = [], isLoading } = usePublicReviews();
  const { data: settings = DEFAULT_SITE_SETTINGS } = useSiteSettings();
  const testimonialYoutubeId = "bKPeI7HgUKc";

  const heading = language === "vn" ? "Lời Chứng Thực" : "Client Testimonials";
  const subheading =
    language === "vn"
      ? "Những trải nghiệm thực từ khách hàng của Phuoc Lai"
      : "Real experiences from Phuoc Lai clients";
  const reviewCount =
    testimonials.length > 0
      ? language === "vn"
        ? `${testimonials.length}+ đánh giá 5 sao`
        : `${testimonials.length}+ five-star reviews`
      : language === "vn"
        ? "Đánh giá từ khách hàng"
        : "Client reviews";

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="px-8 md:px-20 pt-32 pb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block uppercase tracking-[0.4em] text-[10px] text-foreground/50 mb-5"
        >
          FEEDBACK
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight max-w-3xl text-foreground"
        >
          {heading}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 flex items-center gap-4"
        >
          <p className="text-foreground/70 font-light text-sm tracking-wide">{subheading}</p>
          <span className="w-px h-4 bg-foreground/20" />
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-foreground text-foreground" />
            ))}
            <span className="text-foreground/50 text-xs ml-1">{reviewCount}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-12 max-w-4xl"
        >
          <div className="rounded-3xl overflow-hidden border border-border/60 shadow-sm bg-primary">
            <div
              className="aspect-video w-full"
              style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${testimonialYoutubeId}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&showinfo=0`}
                title={language === "vn" ? "Video cảm nhận khách hàng" : "Client testimonial video"}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-bold">
            {language === "vn" ? "Video cảm nhận khách hàng" : "Client testimonial video"}
          </p>
        </motion.div>
      </section>

      <section className="px-8 md:px-20 pb-28 bg-card border-t border-border/60">
        {isLoading ? (
          <p className="text-center text-foreground/40 py-20">Đang tải đánh giá...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-foreground/40 py-20 max-w-md mx-auto">
            Chưa có đánh giá công khai. Vui lòng quay lại sau.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                data-testid={`testimonial-card-${i}`}
                className="flex flex-col h-full bg-card rounded-2xl border border-border/60 p-6 shadow-sm group hover:shadow-md transition-all duration-500"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(item.rating)].map((_, s) => (
                    <Star
                      key={s}
                      size={10}
                      className="fill-foreground/80 text-foreground/80"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 font-light text-sm leading-relaxed mb-6 flex-grow">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.authorName}
                      className="w-full h-full object-cover object-top opacity-80"
                    />
                  </div>
                  <div>
                    <p className="text-foreground text-xs font-medium">{item.authorName}</p>
                    <p className="text-foreground/50 text-[11px] font-light">
                      {item.serviceLabel}
                    </p>
                  </div>
                  <span className="ml-auto text-foreground/30 text-[10px] font-light">
                    {item.reviewDate}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border/60 bg-background px-8 md:px-20 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-6 text-foreground"
          >
            {language === "vn"
              ? "Sẵn sàng tạo nên câu chuyện của riêng bạn?"
              : "Ready to create your own story?"}
          </motion.p>
          <motion.a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="link-hotline-cta"
            className="inline-block border border-border/80 text-foreground rounded-full text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            {language === "vn" ? "Đặt Lịch Ngay" : "Book Now"}
          </motion.a>
        </div>
      </section>
    </div>
  );
}
