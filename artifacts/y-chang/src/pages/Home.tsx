import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Diamond, Leaf, Shield, User, ShieldCheck, Plus, Star } from "lucide-react";
import BookingSection from "@/components/sections/BookingSection";
import SocialSection from "@/components/sections/SocialSection";
import { usePublicTraining } from "@/hooks/use-site-content";
import { POPUP_MASTERS, POPUP_SLIDES } from "@/lib/popup-images";
import { testimonialEmbedUrl } from "@/lib/testimonial-video";

const btnPrimary =
  "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-[11px] uppercase tracking-[0.25em] border border-primary/10";
const btnOutline =
  "rounded-full border-white/20 text-white hover:bg-white hover:text-black px-10 py-6 text-[11px] uppercase tracking-[0.25em]";

export default function Home() {
  const [activeMasterIndex, setActiveMasterIndex] = useState(0);
  const masters = [...POPUP_MASTERS];

  const trainingFallbackImage = (slug: string): string => {
    const s = slug.toLowerCase();
    if (s.includes("amazingbrows")) return "/training-1.png";
    if (s.includes("moi") || s.includes("sexylips")) return "/training-2.png";
    if (s.includes("tong-hop") || s.includes("master")) return "/training-3.png";
    return "/training-4.png";
  };

  const [currentAboutSlide, setCurrentAboutSlide] = useState(0);
  const aboutSlides = [...POPUP_SLIDES];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMasterIndex((prev) => (prev + 1) % masters.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [masters.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAboutSlide((prev) => (prev + 1) % aboutSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [aboutSlides.length]);

  const { data: publicTrainingPhunXam = [] } = usePublicTraining("phun-xam");
  const { data: publicTrainingSpa = [] } = usePublicTraining("spa");

  const trustItems = [
    { icon: Diamond, title: "KỸ THUẬT ĐỘC QUYỀN", desc: "Dịch vụ đẳng cấp 5 sao" },
    { icon: Leaf, title: "MỰC PHUN ORGANIC", desc: "Mực organic Châu Âu" },
    { icon: Shield, title: "AN TOÀN TUYỆT ĐỐI", desc: "Chuẩn y tế quốc tế" },
    { icon: User, title: "CHUYÊN GIA HÀNG ĐẦU", desc: "Master nhiều năm kinh nghiệm" },
    { icon: ShieldCheck, title: "BẢO HÀNH DÀI HẠN", desc: "Hậu mãi chu đáo" },
  ];

  const [activeTab, setActiveTab] = useState<"phun-xam" | "spa">("phun-xam");

  const serviceCategories = [
    {
      id: "phun-xam",
      title: "Permanent Makeup",
      img: "/amazingbrows/Permanent Makeup.jpg",
      slug: "phun-xam",
    },
    { id: "spa", title: "Spa", img: "/spa123.png", slug: "spa" },
  ];

  const trainingCourses = useMemo(
    () => ({
      "phun-xam": publicTrainingPhunXam.slice(0, 4).map((c) => ({
        img: c.image || trainingFallbackImage(c.slug),
        level: c.level.toUpperCase(),
        slug: c.slug,
        title: c.title.toUpperCase(),
        desc: c.description,
      })),
      spa: publicTrainingSpa.slice(0, 4).map((c) => ({
        img: c.image || trainingFallbackImage(c.slug),
        level: c.level.toUpperCase(),
        slug: c.slug,
        title: c.title.toUpperCase(),
        desc: c.description,
      })),
    }),
    [publicTrainingPhunXam, publicTrainingSpa],
  );

  const feedbackItems = [
    { name: "THÙY LINH", course: "Học viên khóa Master", quote: "Khóa học rất bài bản, giảng dạy dễ hiểu, thực hành nhiều." },
    { name: "MINH ANH", course: "Học viên khóa Expert", quote: "Giảng viên tận tâm, kỹ thuật chuẩn và luôn hỗ trợ sau khóa học." },
    { name: "HOÀNG YẾN", course: "Học viên khóa Advanced", quote: "Mình tự tin nhận ca ngay sau khi hoàn thành khóa." },
    { name: "PHƯƠNG THẢO", course: "Học viên khóa Business", quote: "Chương trình giúp mình mở rộng dịch vụ chuyên nghiệp hơn." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-background text-foreground"
      data-testid="page-home"
    >
      {/* Hero — Masters Section */}
      <section
        className="relative w-full overflow-hidden bg-background pt-24 md:pt-0"
        data-testid="section-hero"
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5) * 30;
          const y = (clientY / window.innerHeight - 0.5) * 30;
          const hero = document.getElementById('hero-masters-container');
          if (hero) hero.style.transform = `translate(${x}px, ${y}px)`;
        }}
      >
        <div
          id="hero-masters-container"
          className="relative w-full flex flex-row h-[45vh] sm:h-[60vh] md:h-screen transition-transform duration-500 ease-out"
        >
          {masters.map((master, idx) => (
            <motion.div
              key={idx}
              className="relative flex-1 h-full overflow-hidden group ring-1 ring-white/10"
            >
              {idx > 0 && (
                <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/35 via-black/10 to-transparent opacity-70 z-10" />
              )}
              {idx < masters.length - 1 && (
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/35 via-black/10 to-transparent opacity-70 z-10" />
              )}
              <motion.img
                src={master.img}
                animate={{ 
                  scale: activeMasterIndex === idx ? 1.08 : 1.02
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full object-cover"
                alt={master.name}
              />
              
              {/* Overlay for Name */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end items-center pb-6 md:pb-12 px-2 text-center">
                <motion.div
                  animate={{ 
                    opacity: activeMasterIndex === idx ? 1 : 0.4,
                    y: activeMasterIndex === idx ? 0 : 10
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-white text-[10px] sm:text-[12px] md:text-2xl font-serif tracking-widest whitespace-nowrap">
                    {master.name}
                  </h2>
                </motion.div>
              </div>

              {/* Active indicator line */}
              <motion.div 
                animate={{ 
                  scaleX: activeMasterIndex === idx ? 1 : 0,
                  opacity: activeMasterIndex === idx ? 1 : 0
                }}
                className="absolute bottom-0 left-0 w-full h-[3px] md:h-1.5 bg-gold origin-left z-20"
              />
            </motion.div>
          ))}
        </div>

        {/* Brand signature overlay */}
        <div className="absolute top-[66%] md:top-[64%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-full px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-center"
          >
            <h1 className="font-serif text-white text-lg sm:text-2xl md:text-4xl uppercase tracking-[0.35em] md:tracking-[0.5em] font-light drop-shadow-2xl max-w-4xl mx-auto leading-snug">
              Phuoc Lai Luxury
              <span className="block text-[10px] sm:text-xs md:text-sm tracking-[0.4em] text-gold/90 mt-3 md:mt-4 font-sans normal-case">
                Permanent Makeup &amp; Spa &amp; Academy
              </span>
            </h1>
            <div className="w-24 h-px bg-gold/30 mx-auto mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="py-24 md:py-32 px-6 container mx-auto bg-card" data-testid="section-about">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-32 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold mb-4 md:mb-6 block font-bold">ABOUT PHUOC LAI</span>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 md:mb-10 leading-[1.2] md:leading-[1.1] text-foreground"
              data-testid="text-about-title"
            >
              Nâng tầm thần thái
              <br />
              <span className="italic font-light text-foreground/40">từ từng sợi mày</span>
            </h2>
            <p
              className="text-foreground/70 font-light text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg mx-auto md:mx-0 border-l-0 md:border-l-2 border-gold/20 md:pl-8"
              data-testid="text-about-desc"
            >
              Chúng tôi tin rằng mỗi đôi mày đều mang một vẻ đẹp riêng. Với kỹ thuật chuyên sâu và sự tinh tế trong từng đường nét, Amazing Brows cam kết mang đến cho bạn sự tự tin và thần thái tự nhiên nhất.
            </p>
            <Button asChild className={`${btnPrimary} luxury-shadow w-full sm:w-auto px-12 py-8`}>
              <Link href="/ve-chung-toi">KHÁM PHÁ CÂU CHUYỆN &rarr;</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="w-full md:w-[42%] relative aspect-[4/5] overflow-hidden rounded-3xl order-1 md:order-2 luxury-shadow"
          >
            <div className="absolute -inset-4 border border-gold/10 rounded-3xl -z-10 translate-x-4 translate-y-4 hidden md:block" />
            <AnimatePresence mode="wait">
              <motion.img
                key={currentAboutSlide}
                src={aboutSlides[currentAboutSlide]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                alt={`About Slide ${currentAboutSlide + 1}`}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-6 right-6 flex gap-3">
              {aboutSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentAboutSlide(idx)}
                  className={`h-12 w-12 rounded-full border border-white/20 backdrop-blur-md transition-all flex items-center justify-center text-xs font-bold ${
                    currentAboutSlide === idx ? "bg-gold text-white border-gold" : "bg-primary/40 text-white hover:bg-primary/60"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dịch vụ + giá trị (nền đen liên tục) */}
      <section id="services-section" className="bg-background text-foreground overflow-hidden" data-testid="section-services">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-padding container mx-auto px-6 max-w-7xl relative"
        >
          {/* Subtle background text */}
          <div className="absolute top-0 right-0 text-[15vw] font-serif italic text-foreground/[0.03] pointer-events-none select-none -translate-y-1/4 translate-x-1/4 whitespace-nowrap">
            Signature Services
          </div>

          <div className="mb-24 text-center flex flex-col items-center relative z-10">
            <span
              className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold mb-8 block"
              data-testid="text-services-eyebrow"
            >
              DỊCH VỤ CỦA CHÚNG TÔI
            </span>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-wide text-foreground leading-tight mb-8"
              data-testid="text-services-title"
            >
              Đẹp tự nhiên <br className="md:hidden" />
              <span className="italic font-light text-foreground/40">– Chuẩn từng chi tiết</span>
            </h2>
            <div className="w-24 h-1 bg-gold/50 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 relative z-10">
            {serviceCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 1, ease: "circOut" }}
                className="group flex flex-col"
              >
                <Link href={`/dich-vu/${cat.slug}`} className="block relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="aspect-[16/10] overflow-hidden relative w-full bg-white/5 rounded-3xl shadow-2xl"
                  >
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
            <span className="text-gold text-[9px] uppercase tracking-[0.4em] mb-4 opacity-0 group-hover:opacity-60 transition-opacity duration-500 font-bold">Discover More</span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.22em] uppercase mb-4 text-center px-4">
              {cat.title}
            </h3>
            <div className="w-12 h-[1px] bg-gold/40 group-hover:w-32 transition-all duration-700" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center relative z-10">
            <Button asChild variant="outline" className="rounded-full border-gold/20 text-gold hover:bg-gold hover:text-white hover:border-gold px-12 py-8 text-[11px] uppercase tracking-[0.3em] transition-all" data-testid="btn-services-cta">
              <Link href="/dich-vu">XEM TẤT CẢ DỊCH VỤ &rarr;</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="training-section" className="bg-card section-padding py-24 md:py-32" data-testid="section-home-training">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-24 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <span className="mb-6 block text-[10px] uppercase tracking-[0.5em] text-gold font-bold">ACADEMY PROGRAM</span>
              <h2 className="font-serif text-4xl leading-[1.1] md:text-6xl mb-8">
                Học thật – Làm thật
                <br />
                <span className="italic font-light text-foreground/30">Thành công thật</span>
              </h2>
              <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-foreground/60 border-l-2 border-gold/20 pl-8">
                Chương trình đào tạo chuyên sâu, bài bản từ cơ bản đến nâng cao, cam kết tay nghề vững và lộ trình thực chiến rõ ràng.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex p-2 bg-foreground/5 rounded-full self-start md:self-end luxury-shadow"
            >
              <button
                onClick={() => setActiveTab("phun-xam")}
                className={`px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-500 ${
                  activeTab === "phun-xam" 
                    ? "bg-primary text-primary-foreground shadow-xl scale-105" 
                    : "text-foreground/40 hover:text-foreground/60"
                }`}
              >
                Phun Xăm
              </button>
              <button
                onClick={() => setActiveTab("spa")}
                className={`px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-500 ${
                  activeTab === "spa" 
                    ? "bg-primary text-primary-foreground shadow-xl scale-105" 
                    : "text-foreground/40 hover:text-foreground/60"
                }`}
              >
                Spa
              </button>
            </motion.div>
          </div>

          <div className={`grid grid-cols-1 gap-12 md:grid-cols-2 ${activeTab === "phun-xam" ? "lg:grid-cols-3 max-w-6xl mx-auto" : "lg:grid-cols-4"} mb-24`}>
            {trainingCourses[activeTab].map((course, idx) => (
              <motion.article
                key={course.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group flex flex-col bg-card text-card-foreground rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-border/40"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={course.img} alt={course.title} className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <span className="mb-4 block text-[9px] uppercase tracking-[0.3em] text-gold font-black">{course.level}</span>
                  <h3 className="mb-4 font-serif text-2xl leading-tight group-hover:text-gold transition-colors duration-500">{course.title}</h3>
                  <p className="mb-8 text-sm font-light leading-relaxed text-foreground/55 flex-grow">{course.desc}</p>
                  <Link
                    href={`/dao-tao/${course.slug}`}
                    className="flex items-center justify-between border-t border-border/40 pt-8 group/btn"
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/45 group-hover/btn:text-gold font-bold transition-colors">
                      XEM CHI TIẾT
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 group-hover/btn:bg-gold group-hover/btn:text-white group-hover/btn:border-gold transition-all duration-500 luxury-shadow">
                      <Plus size={18} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <Button asChild className={`${btnPrimary} luxury-shadow px-14 py-8`}>
              <Link href="/dao-tao">XEM TẤT CẢ KHÓA HỌC &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32 text-foreground" data-testid="section-home-feedback">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="mb-6 block text-[10px] uppercase tracking-[0.5em] text-gold font-bold">TESTIMONIALS</span>
              <h2 className="font-serif text-4xl leading-tight md:text-6xl">
                Những lời yêu thương
                <br />
                <span className="italic font-light text-foreground/40">là động lực phát triển</span>
              </h2>
            </motion.div>
            <Button asChild variant="outline" className="rounded-full border-gold/40 text-foreground hover:bg-gold hover:text-white px-10 py-6 text-[10px] uppercase tracking-[0.2em]">
              <Link href="/feedback">Xem tất cả đánh giá</Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden border border-border/60 bg-primary luxury-shadow">
              <div
                className="aspect-video w-full"
                style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
              >
                <iframe
                  src={testimonialEmbedUrl()}
                  title="Video cảm nhận khách hàng"
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
            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.35em] text-foreground/50 font-bold">
              Video cảm nhận khách hàng
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-card py-24 md:py-32" data-testid="section-home-why">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="mb-6 block text-[10px] uppercase tracking-[0.5em] text-gold font-bold">WHY CHOOSE US</span>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Vì sao chọn
              <br />
              <span className="italic font-light text-foreground/40">Phuoc Lai Luxury?</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {trustItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl border border-border/60 bg-card text-card-foreground shadow-sm hover:shadow-2xl transition-all duration-700 p-10 text-center group"
              >
                <div className="h-16 w-14 mx-auto mb-8 flex items-center justify-center text-foreground/80 group-hover:text-gold transition-colors">
                  <item.icon size={48} strokeWidth={1} />
                </div>
                <h4 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em]">{item.title}</h4>
                <p className="text-sm font-light leading-relaxed text-foreground/55">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />
      <SocialSection />
    </motion.div>
  );
}
