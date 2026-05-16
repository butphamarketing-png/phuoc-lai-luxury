import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex gap-4 md:gap-8 h-[600px] relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-1/2 h-[80%] mt-auto relative"
            >
              <img src="/images/artist-phuoclai.png" alt="Phuoc Lai" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 p-4 bg-background/80 backdrop-blur w-full">
                <p className="font-serif text-white text-lg">Phuoc Lai</p>
                <p className="text-primary text-xs tracking-widest uppercase">Master Artist</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-1/2 h-[80%] relative"
            >
              <img src="/images/artist-quynhtam.png" alt="Quynh Tam" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 p-4 bg-background/80 backdrop-blur w-full">
                <p className="font-serif text-white text-lg">Quynh Tam</p>
                <p className="text-primary text-xs tracking-widest uppercase">Ambassador</p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary tracking-widest uppercase text-sm"
            >
              Về Chúng Tôi
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif leading-tight"
            >
              Sự Kết Hợp Của Kỹ Thuật Đỉnh Cao & Tâm Hồn Nghệ Sĩ
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg"
            >
              <p>
                Tại Phuoc Lai Luxury, chúng tôi không chỉ làm đẹp, chúng tôi kiến tạo lại sự tự tin. Master Phuoc Lai với hơn 8 năm tu nghiệp và thực hành, mang đến tiêu chuẩn thẩm mỹ quốc tế cho phụ nữ Việt.
              </p>
              <p>
                Cùng với Quỳnh Tâm, chúng tôi xây dựng một thương hiệu dựa trên sự hoàn hảo, tinh tế và chuyên nghiệp tuyệt đối. Mỗi đường nét, mỗi màu sắc đều được tính toán với độ chính xác đến từng milimet.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}