import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Link } from "wouter";

import { usePageMeta } from "@/hooks/usePageMeta";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo-schema";

export default function About() {
  const { t } = useLang();

  usePageMeta({
    title: "Về chúng tôi | Phuoc Lai Luxury",
    description: "Câu chuyện Phuoc Lai Luxury — studio phun xăm và spa đẳng cấp tại Vũng Tàu với đội ngũ Master giàu kinh nghiệm.",
    path: "/ve-chung-toi",
  });

  return (
    <main className="min-h-screen bg-[#fdfdfb] w-full overflow-x-hidden relative">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Về chúng tôi", path: "/ve-chung-toi" },
          ]),
          webPageSchema({
            name: "Về chúng tôi",
            description: "Câu chuyện Phuoc Lai Luxury tại Vũng Tàu.",
            path: "/ve-chung-toi",
          }),
        ]}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="About Hero" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-[#fdfdfb]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/40 mb-4 block"
          >
            ESTABLISHED 2016
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1a1a1a] leading-tight"
          >
            {t.about.title}
          </motion.h1>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-2xl md:text-4xl font-serif text-[#1a1a1a] leading-relaxed italic mb-12">
              "Vẻ đẹp không nằm ở sự cầu kỳ, mà nằm ở sự tinh tế trong từng đường nét tự nhiên nhất."
            </p>
            <div className="w-20 h-[1px] bg-[#111] mx-auto mb-12" />
            <p className="text-sm md:text-lg text-[#1a1a1a]/60 font-light leading-loose max-w-2xl mx-auto">
              Tại Phuoc Lai Luxury, chúng tôi không chỉ làm đẹp, chúng tôi kiến tạo lại sự tự tin. Master Phuoc Lai với hơn 8 năm tu nghiệp và thực hành, mang đến tiêu chuẩn thẩm mỹ quốc tế cho phụ nữ Việt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif mb-8 text-[#1a1a1a]">Hành trình của sự hoàn hảo</h2>
              <div className="space-y-6 text-[#1a1a1a]/70 font-light leading-relaxed">
                <p>
                  Khởi đầu từ niềm đam mê mãnh liệt với nghệ thuật họa hình, Master Phước Lài đã dành nhiều năm nghiên cứu về tỷ lệ khuôn mặt và sự tương tác giữa ánh sáng và sắc tố da.
                </p>
                <p>
                  Mỗi khách hàng đến với chúng tôi là một bản thể độc bản. Chúng tôi không áp đặt một khuôn mẫu có sẵn, mà lắng nghe và thấu hiểu để tìm ra dáng mày, sắc môi tôn vinh tốt nhất thần thái riêng biệt của từng người.
                </p>
                <p>
                  Sự tinh tế trong từng đường kim, sự thấu hiểu trong từng dáng mày — đó là cách chúng tôi tạo ra những kiệt tác thực sự trên khuôn mặt khách hàng.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] overflow-hidden shadow-2xl"
            >
              <img src="/artist-phuoclai.png" alt="Master Phuoc Lai" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Full Width Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full aspect-video overflow-hidden mb-32 shadow-2xl"
          >
            <img src="/intro-interior.png" alt="Studio Gallery" className="w-full h-full object-cover" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative aspect-[4/5] overflow-hidden shadow-2xl"
            >
              <img src="/artist-quynhtam.png" alt="Quynh Tam" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl font-serif mb-8 text-[#1a1a1a]">Tâm huyết & Sáng tạo</h2>
              <div className="space-y-6 text-[#1a1a1a]/70 font-light leading-relaxed">
                <p>
                  Cùng với Quỳnh Tâm, chúng tôi xây dựng một thương hiệu dựa trên sự hoàn hảo, tinh tế và chuyên nghiệp tuyệt đối. Mỗi đường nét, mỗi màu sắc đều được tính toán với độ chính xác đến từng milimet.
                </p>
                <p>
                  Chúng tôi tin rằng, một đôi lông mày đẹp không chỉ giúp khuôn mặt rạng rỡ hơn, mà còn là chìa khóa mở ra sự tự tin trong giao tiếp và cuộc sống.
                </p>
                <div className="pt-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-[1px] bg-[#111]" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Our Philosophy</span>
                  </div>
                  <p className="italic text-[#1a1a1a]/80">"Làm đẹp bằng cả trái tim và sự tử tế."</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats/Values Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-b border-black/5 py-16 mb-32">
            {[
              { label: "Happy Clients", value: "5000+" },
              { label: "Years Experience", value: "8+" },
              { label: "Master Classes", value: "200+" },
              { label: "Award Wins", value: "15+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <h4 className="text-4xl font-serif text-[#1a1a1a] mb-2">{stat.value}</h4>
                <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Final Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#1a1a1a]">Sứ mệnh của chúng tôi</h2>
            <p className="text-[#1a1a1a]/70 font-light leading-loose mb-12">
              Không ngừng học hỏi và cập nhật những xu hướng, công nghệ mới nhất để mang lại vẻ đẹp tự nhiên, hoàn hảo nhất cho mọi khách hàng. Đồng thời, truyền cảm hứng và đào tạo nên thế hệ chuyên viên PMU xuất sắc tiếp theo.
            </p>
            <Link href="/lien-he">
              <span className="inline-flex items-center justify-center bg-[#111] text-white px-12 py-5 text-xs font-semibold tracking-widest uppercase hover:bg-black transition-all hover:scale-105 cursor-pointer">
                Liên hệ tư vấn ngay
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
