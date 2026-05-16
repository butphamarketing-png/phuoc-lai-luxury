import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus } from "lucide-react";

const services = [
  { img: "/service-1.png", title: "ĐIÊU KHẮC SỢI", desc: "Kỹ thuật phẩy sợi tự nhiên" },
  { img: "/service-2.png", title: "PHUN MÀY OMBRE", desc: "Hiệu ứng rải hạt vi chạm" },
  { img: "/service-3.png", title: "COMBO BROWS", desc: "Kết hợp điêu khắc & ombre" },
  { img: "/service-4.png", title: "XỬ LÝ MÀY HỎNG", desc: "Sửa dáng chuẩn tỷ lệ vàng" },
  { img: "/service-1.png", title: "PHUN MÔI", desc: "Màu trong veo tự nhiên" },
  { img: "/service-2.png", title: "PHUN MÍ", desc: "Mí sắc nét tự nhiên" },
  { img: "/service-3.png", title: "XÓA XĂM", desc: "Công nghệ laser an toàn" },
  { img: "/service-4.png", title: "CHĂM SÓC DA", desc: "Phục hồi chuyên sâu" },
];

export default function Services() {
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
            {t.servicesPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-light max-w-2xl mx-auto"
          >
            Trải nghiệm dịch vụ làm đẹp cao cấp với tiêu chuẩn quốc tế.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1, duration: 0.6 }}
                className="group relative bg-[#1a1a1a] flex flex-col p-6 overflow-hidden border border-white/5 hover:border-white/20 transition-all"
              >
                <div className="relative w-full aspect-square mb-6 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                </div>
                <h3 className="text-sm font-semibold tracking-widest uppercase mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-white/50 font-light leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>
                <div className="mt-auto self-end w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white transition-all cursor-pointer">
                  <Plus size={14} />
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