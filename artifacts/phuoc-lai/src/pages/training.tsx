import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const courses = [
  { img: "/instructor.png", title: "KHÓA CƠ BẢN", desc: "Nắm vững nền tảng kỹ thuật phun xăm", duration: "3 NGÀY" },
  { img: "/service-1.png", title: "KHÓA NÂNG CAO", desc: "Chinh phục kỹ thuật shading, combo", duration: "7 NGÀY" },
  { img: "/service-2.png", title: "KHÓA CHUYÊN SÂU", desc: "Thi thực hành trực tiếp trên model", duration: "10 NGÀY" },
  { img: "/service-3.png", title: "KHÓA BUSINESS", desc: "Mở studio, vận hành thương hiệu", duration: "3 NGÀY" },
  { img: "/service-4.png", title: "KHÓA MASTER LIPS", desc: "Chuyên sâu về phun môi", duration: "5 NGÀY" },
  { img: "/intro-interior.png", title: "KHÓA SỬA LỖI", desc: "Xử lý thảm họa phun xăm", duration: "4 NGÀY" },
];

export default function Training() {
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-[#111] text-white w-full overflow-x-hidden relative">
      <Navbar />
      
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t.trainingPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-light max-w-2xl mx-auto"
          >
            Học thật, làm thật. Truyền đạt 100% kinh nghiệm thực chiến.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
                className="group border border-white/10 p-6 flex flex-col hover:border-white/30 transition-colors bg-[#1a1a1a]"
              >
                <div className="w-full aspect-video mb-6 overflow-hidden bg-[#111]">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-sm font-semibold tracking-widest uppercase mb-3">
                  {course.title}
                </h3>
                <p className="text-xs text-white/50 font-light leading-relaxed mb-8 flex-grow">
                  {course.desc}
                </p>
                <div className="inline-block border border-white/20 px-3 py-1.5 text-[9px] tracking-widest uppercase text-white/70 self-start group-hover:border-white group-hover:text-white transition-all">
                  THỜI GIAN: {course.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}