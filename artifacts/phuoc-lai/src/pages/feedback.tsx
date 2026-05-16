import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Thùy Linh", role: "Khách Hàng Phun Mày", quote: "Không thể tin được đôi lông mày của mình lại có thể tự nhiên và sắc sảo đến vậy. Master Phước Lài thực sự là một nghệ sĩ." },
  { name: "Minh Anh", role: "Khách Hàng Phun Môi", quote: "Môi sau bong màu cực kỳ trong và đẹp. Không sưng, không đau. Dịch vụ chăm sóc ở đây rất chu đáo và chuyên nghiệp." },
  { name: "Hoàng Yến", role: "Khách Hàng Sửa Mày", quote: "Đã từng làm hỏng mày ở nơi khác, đến đây được sửa lại dáng cực chuẩn, màu lên siêu tự nhiên. Rất hài lòng!" },
  { name: "Ngọc Bích", role: "Học Viên Brows Master", quote: "Khóa học rất thực tế và chi tiết. Cô giáo tận tình chỉ dạy từng đường kim. Đã tự tin mở tiệm sau khi tốt nghiệp." },
  { name: "Trang Phạm", role: "Khách Hàng Phun Mày", quote: "Từ lúc làm mày xong ai cũng khen. Dáng mày ôm form mặt, sợi tự nhiên như thật luôn." },
  { name: "Bảo Thy", role: "Khách Hàng Phun Môi", quote: "Thích nhất khoản không bị sưng. Làm xong đi chơi được luôn. Màu lên cực ưng ý." },
  { name: "Lan Khuê", role: "Học Viên Nâng Cao", quote: "Học được rất nhiều tips thực chiến mà không trường lớp nào dạy. Cảm ơn cô giáo rất nhiều." },
  { name: "Hương Giang", role: "Khách Hàng Sửa Mày", quote: "Tưởng chừng như vô vọng với đôi lông mày cũ. Thật may vì đã tìm đến Phuoc Lai Luxury." },
];

export default function Feedback() {
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
            {t.feedbackPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-light max-w-2xl mx-auto"
          >
            Sự hài lòng của bạn là thành công lớn nhất của chúng tôi.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1, duration: 0.5 }}
                className="bg-[#1a1a1a] p-8 flex flex-col h-full border border-white/5 hover:border-white/20 transition-all"
              >
                <div className="flex gap-1 mb-6 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <p className="text-sm font-light text-white/80 leading-relaxed mb-8 flex-grow">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-serif border border-white/20">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide">{item.name}</h4>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
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