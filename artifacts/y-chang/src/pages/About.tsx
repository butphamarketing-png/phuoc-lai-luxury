import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";
import { useState, useEffect, useMemo } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const POPUP_VERSION = "20260528";

export default function About() {
  const { language } = useLanguage();
  const { data: settings = DEFAULT_SITE_SETTINGS } = useSiteSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    `/pop-up-1.jpg?v=${POPUP_VERSION}`,
    `/pop-up-2.jpg?v=${POPUP_VERSION}`,
    `/pop-up-1.jpg?v=${POPUP_VERSION}`,
  ];
  const testimonialYoutubeId = "bKPeI7HgUKc";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const content = useMemo(() => ({
    vn: {
      eyebrow: "VỀ CHÚNG TÔI",
      title: "Câu Chuyện Của Phước Lai Luxury",
      subtitle: "Hành trình kiến tạo vẻ đẹp bền vững qua từng đường nét điêu khắc",
      p1: "Phuoc Lai Permanent Makeup được thành lập với một niềm tin đơn giản nhưng sâu sắc: vẻ đẹp thực sự là thứ không cần cố gắng. Nó đến từ sự cân bằng hoàn hảo giữa thiên nhiên và nghệ thuật — khi từng đường nét được khắc họa đúng chỗ, đúng lúc, đúng người.",
      p2: "Chúng tôi không chạy theo xu hướng. Chúng tôi đi trước xu hướng bằng kỹ thuật. Mỗi khách hàng bước vào studio của chúng tôi đều được tiếp nhận như một tác phẩm nghệ thuật độc lập — có cấu trúc khuôn mặt riêng, có câu chuyện riêng, có vẻ đẹp tiềm ẩn riêng cần được khai phá.",
      p3: "Tại Phuoc Lai, chúng tôi ứng dụng công nghệ PMU tiên tiến nhất từ Châu Âu và Hàn Quốc, kết hợp với đôi tay của các nghệ nhân được đào tạo bài bản trong và ngoài nước. Kết quả là những tác phẩm tồn tại theo thời gian — không phai nhạt, không biến dạng, không lỗi thời.",
      valuesTitle: "Giá Trị Cốt Lõi",
      values: [
        { title: "Kỹ Thuật Độc Quyền", desc: "Không phải studio nào cũng có thể tái tạo kết quả của chúng tôi. Quy trình điêu khắc độc quyền được phát triển qua hàng ngàn ca thực tế." },
        { title: "Mực Hữu Cơ 100%", desc: "Toàn bộ dòng mực pigment sử dụng tại Phuoc Lai đều là mực hữu cơ cao cấp, nhập khẩu trực tiếp từ Châu Âu. An toàn tuyệt đối cho da nhạy cảm." },
        { title: "Tiêu Chuẩn Vô Trùng", desc: "Mỗi dụng cụ đều được tiệt trùng theo tiêu chuẩn y tế quốc tế. Môi trường làm việc sạch sẽ, kiểm soát nhiễm khuẩn nghiêm ngặt." },
        { title: "Bảo Hành Dài Hạn", desc: "Chúng tôi bảo hành kết quả sau mỗi lần thực hiện dịch vụ. Khách hàng được hỗ trợ touch-up miễn phí trong thời gian quy định." },
      ],
      studioTitle: "Studio Của Chúng Tôi",
      studioDesc: "Không gian làm việc được thiết kế riêng để mang lại cảm giác thư thái và tin tưởng tuyệt đối. Mỗi góc nhỏ đều được chăm chút — từ ánh sáng, mùi hương đến âm nhạc — để bạn có trải nghiệm hoàn toàn thư giãn trong suốt quá trình.",
      address: settings.address,
      hours: settings.hours,
      hotline: settings.phoneDisplay,
    },
    en: {
      eyebrow: "ABOUT US",
      title: "The Story of Phuoc Lai",
      subtitle: "A journey of creating lasting beauty through every sculpted line",
      p1: "Phuoc Lai Permanent Makeup was founded on a simple but profound belief: true beauty requires no effort. It comes from a perfect balance between nature and artistry — when every line is drawn in the right place, at the right time, for the right person.",
      p2: "We don't follow trends. We stay ahead of them through technique. Each client who enters our studio is treated as a unique work of art — with their own facial structure, their own story, their own latent beauty waiting to be revealed.",
      p3: "At Phuoc Lai, we apply the most advanced PMU technology from Europe and Korea, combined with the hands of master artists trained both domestically and abroad. The result is work that stands the test of time — never fading, never distorting, never going out of style.",
      valuesTitle: "Core Values",
      values: [
        { title: "Exclusive Technique", desc: "Not every studio can replicate our results. Our proprietary sculpting process has been refined through thousands of real cases." },
        { title: "100% Organic Ink", desc: "All pigment ink used at Phuoc Lai is premium organic ink, imported directly from Europe. Absolutely safe for sensitive skin." },
        { title: "Sterile Standards", desc: "Every instrument is sterilized to international medical standards. A clean working environment with strict infection control." },
        { title: "Long-term Warranty", desc: "We guarantee results after each service. Clients receive free touch-ups within the warranty period." },
      ],
      studioTitle: "Our Studio",
      studioDesc: "The workspace is custom-designed to provide complete relaxation and absolute trust. Every corner is carefully curated — from lighting and fragrance to music — so you have a fully relaxing experience throughout the process.",
      address: settings.address,
      hours: settings.hours,
      hotline: settings.phoneDisplay,
    },
  }), [settings.phoneDisplay, settings.address, settings.hours]);

  const c = content[language];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-16 px-8 md:px-20 overflow-hidden bg-background pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/25 via-foreground/10 to-background" />
        <div className="relative z-10 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block uppercase tracking-[0.4em] text-[10px] text-foreground/50 mb-4"
          >
            {c.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight text-foreground"
          >
            {c.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-4 text-foreground/60 font-light text-sm md:text-base tracking-wide max-w-xl"
          >
            {c.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Testimonial video */}
      <section className="px-8 md:px-20 py-16 md:py-20 bg-card">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden border border-border/60 shadow-sm bg-primary"
          >
            <div
              className="aspect-video w-full"
              style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${testimonialYoutubeId}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&showinfo=0`}
                title={language === "vn" ? "Cảm nhận khách hàng" : "Client testimonial"}
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
          </motion.div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-bold text-center">
            {language === "vn" ? "Cảm nhận khách hàng" : "Client testimonial"}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-8 md:px-20 py-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {[c.p1, c.p2, c.p3].map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="text-foreground/80 font-light leading-relaxed text-sm md:text-base"
              >
                {para}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg border border-black/5 group"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slides[currentSlide]}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8 }}
                alt={`Phuoc Lai Luxury ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ảnh ${i + 1}`}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide
                      ? "w-8 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="absolute -bottom-6 -left-6 w-2/3 aspect-square border border-foreground/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Thin divider */}
      <div className="border-t border-border mx-8 md:mx-20" />

      {/* Values */}
      <section className="px-8 md:px-20 py-24 bg-card">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="font-serif text-3xl md:text-4xl font-medium mb-16 tracking-tight text-center"
        >
          {c.valuesTitle}
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.values.map((v, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="border-t border-foreground/10 pt-8 space-y-3"
            >
              <span className="text-foreground/30 text-xs font-light tracking-[0.3em] uppercase">0{i + 1}</span>
              <h3 className="font-serif text-lg font-medium text-foreground">{v.title}</h3>
              <p className="text-foreground/60 text-sm font-light leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Studio info */}
      <section className="bg-background text-foreground border-t border-border/60 px-8 md:px-20 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6 tracking-tight">{c.studioTitle}</h2>
            <p className="text-foreground/60 font-light leading-relaxed text-sm mb-10">{c.studioDesc}</p>
            <dl className="space-y-4 text-sm">
              <div className="flex gap-4">
                <dt className="text-foreground/40 uppercase tracking-[0.2em] text-xs w-20 flex-shrink-0 pt-0.5">
                  {language === "vn" ? "Địa chỉ" : "Address"}
                </dt>
                <dd className="text-foreground/80 font-light">{c.address}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-foreground/40 uppercase tracking-[0.2em] text-xs w-20 flex-shrink-0 pt-0.5">
                  {language === "vn" ? "Giờ mở" : "Hours"}
                </dt>
                <dd className="text-foreground/80 font-light">{c.hours}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-foreground/40 uppercase tracking-[0.2em] text-xs w-20 flex-shrink-0 pt-0.5">
                  Hotline
                </dt>
                <dd className="text-foreground/80 font-light">{c.hotline}</dd>
              </div>
            </dl>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-video bg-foreground/10 overflow-hidden rounded-2xl border border-border/60"
          >
            <img
              src="/khong-gian.jpg"
              alt="Không gian studio"
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
