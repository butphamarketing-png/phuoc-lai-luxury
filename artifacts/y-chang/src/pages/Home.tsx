import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Diamond, Leaf, Shield, User, ShieldCheck, Plus, Star } from "lucide-react";
import BookingSection from "@/components/sections/BookingSection";
import SocialSection from "@/components/sections/SocialSection";

const btnPrimary =
  "rounded-full bg-[#1A1A1A] text-white hover:bg-black px-10 py-6 text-[11px] uppercase tracking-[0.25em] border-none";
const btnOutline =
  "rounded-full border-white/20 text-white hover:bg-white hover:text-black px-10 py-6 text-[11px] uppercase tracking-[0.25em]";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = ["/Slideshow-1.png"];

  const [currentAboutSlide, setCurrentAboutSlide] = useState(0);
  const aboutSlides = ["/Gioi-thieu-1.png", "/Gioi-thieu-2.png", "/Gioi-thieu-3.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAboutSlide((prev) => (prev + 1) % aboutSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [aboutSlides.length]);

  const services = [
    { id: "brows", slug: "dieu-khac-hairstroke", img: "/service-brows.png", title: "ĐIÊU KHẮC SỢI", desc: "Kỹ thuật tạo sợi siêu thực." },
    { id: "ombre", slug: "phun-may-ombre", img: "/service-ombre.png", title: "PHUN MÀY OMBRE", desc: "Hiệu ứng rải hạt vi điểm." },
    { id: "combo", slug: "combo-brows", img: "/service-combo.png", title: "COMBO BROWS", desc: "Kết hợp điêu khắc và phun ombre." },
    { id: "correction", slug: "xu-ly-may-hong", img: "/service-correction.png", title: "XỬ LÝ MÀY HỎNG", desc: "Chỉnh sửa, hút dung dịch, xóa xăm." },
  ];

  const trustItems = [
    { icon: Diamond, title: "KỸ THUẬT ĐỘC QUYỀN", desc: "Dịch vụ đẳng cấp 5 sao" },
    { icon: Leaf, title: "MỰC PHUN ORGANIC", desc: "Mực organic Châu Âu" },
    { icon: Shield, title: "AN TOÀN TUYỆT ĐỐI", desc: "Chuẩn y tế quốc tế" },
    { icon: User, title: "CHUYÊN GIA HÀNG ĐẦU", desc: "Master nhiều năm kinh nghiệm" },
    { icon: ShieldCheck, title: "BẢO HÀNH DÀI HẠN", desc: "Hậu mãi chu đáo" },
  ];

  const [activeTab, setActiveTab] = useState<"phun-xam" | "spa">("phun-xam");

  const serviceCategories = [
    { id: "phun-xam", title: "Phun Xăm Thẩm Mỹ", img: "/service-brows.png", slug: "phun-xam" },
    { id: "spa", title: "Spa", img: "/studio-interior.png", slug: "spa" },
  ];

  const trainingCourses = {
    "phun-xam": [
      { img: "/training-1.png", level: "KHÓA NÂNG CAO", slug: "amazing-brows", title: "KHÓA HỌC SỢI AMAZINGBROWS NÂNG CAO", desc: "Kỹ thuật tạo sợi siêu thực AMAZINGBROWS đỉnh cao dành cho thợ lành nghề." },
      { img: "/training-2.png", level: "KHÓA CHUYÊN SÂU", slug: "lip-master", title: "KHÓA HỌC MÔI CHUYÊN SÂU", desc: "Kỹ thuật phun môi SEXYLIPS không sưng, bám màu nhanh và tự nhiên." },
      { img: "/training-3.png", level: "KHÓA TỔNG HỢP", slug: "master-advanced", title: "KHÓA HỌC TỔNG HỢP CHUYÊN SÂU", desc: "Trọn bộ kiến thức từ sợi, mày, môi và mí phượng hoàng chuyên sâu." },
    ],
    "spa": [
      { img: "/training-1.png", level: "KHÓA CƠ BẢN", slug: "spa-basic", title: "SPA BASIC", desc: "Kiến thức nền tảng về chăm sóc da và các quy trình spa cơ bản." },
      { img: "/training-2.png", level: "KHÓA NÂNG CAO", slug: "spa-advanced", title: "SPA ADVANCED", desc: "Kỹ thuật chăm sóc da chuyên sâu và sử dụng công nghệ cao." },
      { img: "/training-3.png", level: "KHÓA CHUYÊN GIA", slug: "spa-expert", title: "SPA EXPERT", desc: "Đào tạo quản lý và vận hành hệ thống spa chuyên nghiệp." },
      { img: "/training-4.png", level: "KHÓA TRỊ LIỆU", slug: "spa-therapy", title: "SPA THERAPY", desc: "Các liệu pháp trị liệu đặc biệt và phục hồi da chuyên sâu." },
    ]
  };

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
      className="w-full bg-[#FAFAFA] text-[#1A1A1A]"
      data-testid="page-home"
    >
      {/* Hero — Pure image slideshow */}
      <section
        className="relative h-[60vh] sm:h-[80vh] md:h-screen w-full overflow-hidden bg-[#1A1A1A]"
        data-testid="section-hero"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide]}
              className="h-full w-full object-cover object-center"
              alt={`Hero Slide ${currentSlide + 1}`}
            />
            {/* Professional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 md:from-black/20 md:to-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Brand signature on hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-24 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center px-4"
          >
            <h1 className="text-white text-[11px] sm:text-[14px] md:text-[16px] uppercase tracking-[0.6em] sm:tracking-[0.8em] md:tracking-[1em] font-light mb-4 opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Phuoc Lai Luxury
            </h1>
            <div className="w-12 h-px bg-white/40 mx-auto shadow-2xl" />
          </motion.div>
        </div>

        {/* Navigation Dots - Only show if more than 1 slide */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-500 ${
                  currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Giới thiệu */}
      <section className="py-12 md:py-24 px-6 container mx-auto bg-[#FAFAFA]" data-testid="section-about">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-32 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-black/40 mb-4 md:mb-6 block font-medium">ABOUT PHUOC LAI</span>
            <h2
              className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-10 leading-[1.2] md:leading-[1.1] text-[#1A1A1A]"
              data-testid="text-about-title"
            >
              Nâng tầm thần thái
              <br />
              <span className="italic font-light">từ từng sợi mày</span>
            </h2>
            <p
              className="text-[#1A1A1A]/70 font-light text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg mx-auto md:mx-0 border-l-0 md:border-l-2 border-black/5 md:pl-8"
              data-testid="text-about-desc"
            >
              Chúng tôi tin rằng mỗi đôi mày đều mang một vẻ đẹp riêng. Với kỹ thuật chuyên sâu và sự tinh tế trong từng đường nét, Amazing Brows cam kết mang đến cho bạn sự tự tin và thần thái tự nhiên nhất.
            </p>
            <Button asChild className={`${btnPrimary} luxury-shadow w-full sm:w-auto`}>
              <Link href="/ve-chung-toi">KHÁM PHÁ CÂU CHUYỆN &rarr;</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="w-full md:w-[42%] relative aspect-[4/5] overflow-hidden rounded-xl order-1 md:order-2"
          >
            <div className="absolute -inset-4 border border-black/5 rounded-2xl -z-10 translate-x-4 translate-y-4 hidden md:block" />
            <AnimatePresence mode="wait">
              <motion.img
                key={currentAboutSlide}
                src={aboutSlides[currentAboutSlide]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                alt={`About Slide ${currentAboutSlide + 1}`}
                className="w-full h-full object-cover grayscale shadow-2xl"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Dịch vụ + giá trị (nền đen liên tục) */}
      <section id="services-section" className="bg-[#1A1A1A] text-white overflow-hidden" data-testid="section-services">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-padding container mx-auto px-6 max-w-7xl relative"
        >
          {/* Subtle background text */}
          <div className="absolute top-0 right-0 text-[15vw] font-serif italic text-white/[0.02] pointer-events-none select-none -translate-y-1/4 translate-x-1/4 whitespace-nowrap">
            Signature Services
          </div>

          <div className="mb-24 text-center flex flex-col items-center relative z-10">
            <span
              className="text-[10px] uppercase tracking-[0.5em] font-medium text-white/40 mb-8 block"
              data-testid="text-services-eyebrow"
            >
              DỊCH VỤ CỦA CHÚNG TÔI
            </span>
            <h2
              className="text-4xl md:text-6xl font-serif tracking-wide text-white leading-tight"
              data-testid="text-services-title"
            >
              Đẹp tự nhiên <br className="md:hidden" />
              <span className="italic font-light text-white/60">– Chuẩn từng chi tiết</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 relative z-10">
            {serviceCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8, ease: "circOut" }}
                className="group flex flex-col"
              >
                <Link href={`/dich-vu/${cat.slug}`} className="block relative">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="aspect-[16/10] overflow-hidden relative w-full bg-white/5 rounded-2xl shadow-2xl"
                  >
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                      <h3 className="font-serif text-3xl md:text-4xl text-white tracking-widest uppercase mb-4">
                        {cat.title}
                      </h3>
                      <div className="w-12 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-500" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center relative z-10">
            <Button asChild variant="outline" className={`${btnOutline} border-white/10 hover:border-white/40`} data-testid="btn-services-cta">
              <Link href="/dich-vu">XEM TẤT CẢ DỊCH VỤ &rarr;</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="training-section" className="bg-[#FAFAFA] section-padding" data-testid="section-home-training">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-6 block text-[10px] uppercase tracking-[0.5em] text-black/40 font-medium">CHƯƠNG TRÌNH ĐÀO TẠO</span>
              <h2 className="font-serif text-4xl leading-[1.1] md:text-6xl mb-8">
                Học thật – Làm thật
                <br />
                <span className="italic font-light text-black/50">Thành công thật</span>
              </h2>
              <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-black/60 border-l-2 border-black/5 pl-8">
                Chương trình đào tạo chuyên sâu, bài bản từ cơ bản đến nâng cao, cam kết tay nghề vững và lộ trình thực chiến rõ ràng.
              </p>
            </div>
            
            <div className="flex p-1.5 bg-black/5 rounded-full self-start md:self-end luxury-shadow">
              <button
                onClick={() => setActiveTab("phun-xam")}
                className={`px-10 py-3.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-semibold transition-all duration-500 ${
                  activeTab === "phun-xam" 
                    ? "bg-[#1A1A1A] text-white shadow-xl scale-105" 
                    : "text-black/40 hover:text-black/60"
                }`}
              >
                Phun Xăm
              </button>
              <button
                onClick={() => setActiveTab("spa")}
                className={`px-10 py-3.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-semibold transition-all duration-500 ${
                  activeTab === "spa" 
                    ? "bg-[#1A1A1A] text-white shadow-xl scale-105" 
                    : "text-black/40 hover:text-black/60"
                }`}
              >
                Spa
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-1 gap-10 md:grid-cols-2 ${activeTab === "phun-xam" ? "lg:grid-cols-3 max-w-6xl mx-auto" : "lg:grid-cols-4"} mb-24`}>
            {trainingCourses[activeTab].map((course, idx) => (
              <motion.article
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: "circOut" }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-black/[0.03]"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={course.img} alt={course.title} className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-110 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="mb-4 block text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold">{course.level}</span>
                  <h3 className="mb-4 font-serif text-2xl leading-tight group-hover:text-black transition-colors">{course.title}</h3>
                  <p className="mb-8 text-sm font-light leading-relaxed text-black/50 flex-grow">{course.desc}</p>
                  <Link
                    href={`/dao-tao/${course.slug}`}
                    className="flex items-center justify-between border-t border-black/[0.06] pt-6 group/btn"
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] text-black/40 group-hover/btn:text-black font-bold transition-colors">
                      XEM CHI TIẾT
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 group-hover/btn:bg-[#1A1A1A] group-hover/btn:text-white transition-all duration-500 luxury-shadow">
                      <Plus size={16} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <Button asChild className={`${btnPrimary} luxury-shadow px-14`}>
              <Link href="/dao-tao">XEM TẤT CẢ KHÓA HỌC &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] py-24 text-white" data-testid="section-home-feedback">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <span className="mb-4 block text-[10px] uppercase tracking-[0.4em] text-white/45">FEEDBACK HỌC VIÊN</span>
              <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                Những lời yêu thương
                <br />
                là động lực của chúng tôi
              </h2>
            </div>
            <Link href="/feedback" className="hidden rounded-full border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:bg-white hover:text-black md:inline-flex">
              Xem thêm
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {feedbackItems.map((item, idx) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-lg border border-white/5 bg-white/5 p-7 flex flex-col h-full backdrop-blur-sm"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/40 border border-white/5">
                    PL
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-white/45">{item.course}</p>
                  </div>
                </div>
                <div className="mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={12} className="fill-white text-white opacity-80" />
                  ))}
                </div>
                <p className="font-serif text-sm italic leading-relaxed text-white/70 flex-grow">&ldquo;{item.quote}&rdquo;</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] py-20" data-testid="section-home-why">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center font-serif text-3xl leading-tight md:text-5xl">
            VÌ SAO CHỌN
            <br />
            PHUOC LAI LUXURY?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {trustItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow p-8 text-center"
              >
                <item.icon size={32} strokeWidth={1} className="mx-auto mb-5 text-black/80" />
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest">{item.title}</h4>
                <p className="text-sm font-light leading-relaxed text-black/55">{item.desc}</p>
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
