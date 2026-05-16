import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-[#f5f5f0] w-full overflow-x-hidden relative">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-[#111] text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center pt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t.about.title}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg md:prose-xl prose-p:text-[#1a1a1a]/70 prose-headings:font-serif prose-headings:text-[#1a1a1a]"
          >
            <p className="lead text-2xl font-light italic mb-12">
              Tại Phuoc Lai Luxury, chúng tôi không chỉ làm đẹp, chúng tôi kiến tạo lại sự tự tin. Master Phuoc Lai với hơn 8 năm tu nghiệp và thực hành, mang đến tiêu chuẩn thẩm mỹ quốc tế cho phụ nữ Việt.
            </p>

            <img src="/intro-interior.png" alt="Studio" className="w-full aspect-video object-cover mb-12 border border-black/10" />

            <h3>Hành trình của sự hoàn hảo</h3>
            <p>
              Cùng với Quỳnh Tâm, chúng tôi xây dựng một thương hiệu dựa trên sự hoàn hảo, tinh tế và chuyên nghiệp tuyệt đối. Mỗi đường nét, mỗi màu sắc đều được tính toán với độ chính xác đến từng milimet.
            </p>

            <p>
              Sự tinh tế trong từng đường kim, sự thấu hiểu trong từng dáng mày — đó là cách chúng tôi tạo ra những kiệt tác thực sự trên khuôn mặt khách hàng.
            </p>

            <div className="grid grid-cols-2 gap-6 my-12">
              <img src="/instructor.png" alt="Training" className="w-full aspect-[4/5] object-cover border border-black/10" />
              <img src="/service-1.png" alt="Detail" className="w-full aspect-[4/5] object-cover border border-black/10" />
            </div>

            <h3>Sứ mệnh</h3>
            <p>
              Không ngừng học hỏi và cập nhật những xu hướng, công nghệ mới nhất để mang lại vẻ đẹp tự nhiên, hoàn hảo nhất cho mọi khách hàng. Đồng thời, truyền cảm hứng và đào tạo nên thế hệ chuyên viên PMU xuất sắc tiếp theo.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}