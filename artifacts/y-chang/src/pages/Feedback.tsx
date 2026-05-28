import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";
import { testimonialEmbedUrl } from "@/lib/testimonial-video";

export default function Feedback() {
  const { language } = useLanguage();
  const { data: settings = DEFAULT_SITE_SETTINGS } = useSiteSettings();
  const heading =
    language === "vn" ? "Video cảm nhận khách hàng" : "Client testimonial video";
  const subheading =
    language === "vn"
      ? "Trải nghiệm thực tế từ khách hàng Phuoc Lai Luxury"
      : "Real client experiences at Phuoc Lai Luxury";

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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-foreground/70 font-light text-sm tracking-wide max-w-xl"
        >
          {subheading}
        </motion.p>

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
                src={testimonialEmbedUrl()}
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

      <section className="border-t border-border/60 bg-card px-8 md:px-20 py-16">
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
