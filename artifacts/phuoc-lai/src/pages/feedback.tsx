import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Star } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo-schema";

const testimonials = [
  { name: "Thùy Linh", role: "Khách Hàng Phun Mày", quote: "Không thể tin được đôi lông mày của mình lại có thể tự nhiên và sắc sảo đến vậy. Master Phước Lài thực sự là một nghệ sĩ.", avatar: "/avatar-1.png" },
  { name: "Minh Anh", role: "Khách Hàng Phun Môi", quote: "Môi sau bong màu cực kỳ trong và đẹp. Không sưng, không đau. Dịch vụ chăm sóc ở đây rất chu đáo và chuyên nghiệp.", avatar: "/avatar-2.png" },
  { name: "Hoàng Yến", role: "Khách Hàng Sửa Mày", quote: "Đã từng làm hỏng mày ở nơi khác, đến đây được sửa lại dáng cực chuẩn, màu lên siêu tự nhiên. Rất hài lòng!", avatar: "/avatar-3.png" },
  { name: "Ngọc Bích", role: "Học Viên Brows Master", quote: "Khóa học rất thực tế và chi tiết. Cô giáo tận tình chỉ dạy từng đường kim. Đã tự tin mở tiệm sau khi tốt nghiệp.", avatar: "/avatar-1.png" },
  { name: "Trang Phạm", role: "Khách Hàng Phun Mày", quote: "Từ lúc làm mày xong ai cũng khen. Dáng mày ôm form mặt, sợi tự nhiên như thật luôn.", avatar: "/avatar-2.png" },
  { name: "Bảo Thy", role: "Khách Hàng Phun Môi", quote: "Thích nhất khoản không bị sưng. Làm xong đi chơi được luôn. Màu lên cực ưng ý.", avatar: "/avatar-3.png" },
  { name: "Lan Khuê", role: "Học Viên Nâng Cao", quote: "Học được rất nhiều tips thực chiến mà không trường lớp nào dạy. Cảm ơn cô giáo rất nhiều.", avatar: "/avatar-1.png" },
  { name: "Hương Giang", role: "Khách Hàng Sửa Mày", quote: "Tưởng chừng như vô vọng với đôi lông mày cũ. Thật may vì đã tìm đến Phuoc Lai PMU.", avatar: "/avatar-2.png" },
];

export default function Feedback() {
  const { t } = useLang();

  usePageMeta({
    title: "Feedback | Phuoc Lai Luxury",
    description: "Những lời yêu thương từ khách hàng và học viên Phuoc Lai Luxury Vũng Tàu.",
    path: "/feedback",
  });

  return (
    <main className="min-h-screen bg-[#111] text-white w-full overflow-x-hidden">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Feedback", path: "/feedback" },
          ]),
          webPageSchema({
            name: "Feedback",
            description: "Đánh giá từ khách hàng Phuoc Lai Luxury.",
            path: "/feedback",
          }),
        ]}
      />
      <Navbar />

      <section className="relative pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.45em] font-bold text-white/40 mb-5 block"
          >
            FEEDBACK HỌC VIÊN
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t.feedbackPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 font-light max-w-2xl mx-auto text-sm italic"
          >
            Những lời yêu thương là động lực của chúng tôi
          </motion.p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.08 }}
                className="bg-[#e8e8e8] text-[#1a1a1a] p-7 flex flex-col min-h-[260px] hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex gap-1 mb-5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[12px] font-light leading-relaxed mb-8 flex-grow text-[#1a1a1a]/75">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-black/10 bg-white shrink-0">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wide">{item.name}</h4>
                    <p className="text-[9px] text-[#1a1a1a]/45 uppercase tracking-widest mt-0.5">
                      {item.role}
                    </p>
                  </div>
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
