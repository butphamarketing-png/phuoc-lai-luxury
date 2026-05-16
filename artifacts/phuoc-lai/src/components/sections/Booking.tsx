import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Booking() {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-black mb-6"
        >
          Sẵn Sàng Cho Sự Thay Đổi?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-black/80 font-medium text-lg mb-10"
        >
          Đặt lịch tư vấn miễn phí ngay hôm nay để chuyên gia của chúng tôi kiến tạo vẻ đẹp dành riêng cho bạn.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto"
        >
          <Input 
            placeholder="Số điện thoại của bạn" 
            className="bg-black/10 border-black/20 text-black placeholder:text-black/50 h-14 rounded-none focus-visible:ring-black"
          />
          <Button className="bg-black hover:bg-black/80 text-primary uppercase tracking-widest h-14 rounded-none px-8">
            Gọi Lại Cho Tôi
          </Button>
        </motion.form>
      </div>
    </section>
  );
}