import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const testimonials = [
  {
    name: "Nguyễn Thị Lan",
    service: "Điêu Khắc Chân Mày",
    rating: 5,
    text: "Mình đã đắn đo rất lâu trước khi quyết định làm mày. Nhưng sau khi đến Phuoc Lai, mình thật sự không hối hận. Chân mày ra đúng như kỳ vọng — tự nhiên, không giả tạo, và phù hợp hoàn toàn với khuôn mặt mình.",
    date: "Tháng 3, 2024",
    img: "/hero-portrait.png"
  },
  {
    name: "Trần Minh Châu",
    service: "Phun Môi Cấy Tế Bào",
    rating: 5,
    text: "Kỹ thuật cực kỳ tốt. Không đau, không sưng. Màu ra tự nhiên hơn mình nghĩ nhiều. Chị thợ tư vấn rất tận tâm, giải thích rõ từng bước. Mình sẽ quay lại làm eyeliner.",
    date: "Tháng 2, 2024",
    img: "/hero-portrait.png"
  },
  {
    name: "Phạm Hồng Nhung",
    service: "Ombre Brows",
    rating: 5,
    text: "Studio sạch sẽ, không khí sang trọng và chuyên nghiệp. Được tư vấn shape phù hợp với từng nét mặt. Kết quả đẹp hơn cả mong đợi. Đây là lần thứ 2 mình quay lại rồi.",
    date: "Tháng 1, 2024",
    img: "/hero-portrait.png"
  },
  {
    name: "Vũ Thị Mai",
    service: "Xử Lý Chân Mày Cũ",
    rating: 5,
    text: "Chân mày cũ của mình bị lỗi từ nơi khác làm. Sau khi đến Phuoc Lai xử lý, mình hoàn toàn hài lòng. Quá trình nhẹ nhàng, không đau như lo lắng. Cảm ơn team rất nhiều.",
    date: "Tháng 12, 2023",
    img: "/hero-portrait.png"
  },
  {
    name: "Lê Thị Bảo Châu",
    service: "Điêu Khắc Chân Mày",
    rating: 5,
    text: "Đã từng làm ở nhiều chỗ nhưng Phuoc Lai là nơi cho ra kết quả tự nhiên nhất. Sợi lông mày siêu mỏng, không phân biệt được với lông thật. Mình recommend tất cả mọi người.",
    date: "Tháng 11, 2023",
    img: "/hero-portrait.png"
  },
  {
    name: "Ngô Thị Huyền",
    service: "Phun Môi Vi Chạm",
    rating: 5,
    text: "Dịch vụ 5 sao từ lúc đặt lịch đến khi ra về. Staff thân thiện, chu đáo. Sau 1 tháng lành hoàn toàn, màu giữ rất đẹp và đều. Chắc chắn sẽ quay lại.",
    date: "Tháng 10, 2023",
    img: "/hero-portrait.png"
  },
  {
    name: "Đinh Phương Anh",
    service: "Combo Brows",
    rating: 5,
    text: "Combo brows là lựa chọn đúng đắn nhất mình từng làm. Vừa có sợi tự nhiên vừa có độ sắc nét khi ra ngoài. Hoàn hảo cho mình — không cần kẻ mày nữa.",
    date: "Tháng 9, 2023",
    img: "/hero-portrait.png"
  },
  {
    name: "Bùi Thị Hà",
    service: "Ombre Brows",
    rating: 5,
    text: "Lần đầu làm mày ombre mà mình không lo lắng tí nào vì được tư vấn và demo trước. Sau khi lành, màu nhạt tự nhiên đúng như ý muốn. Cực kỳ ưng.",
    date: "Tháng 8, 2023",
    img: "/hero-portrait.png"
  },
];

export default function Feedback() {
  const { language } = useLanguage();

  const heading = language === "vn" ? "Lời Chứng Thực" : "Client Testimonials";
  const subheading = language === "vn"
    ? "Những trải nghiệm thực từ khách hàng của Phuoc Lai"
    : "Real experiences from Phuoc Lai clients";
  const reviewCount = language === "vn" ? "500+ đánh giá 5 sao" : "500+ five-star reviews";

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <section className="px-8 md:px-20 pt-32 pb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block uppercase tracking-[0.4em] text-[10px] text-foreground/50 mb-5"
        >
          FEEDBACK
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight max-w-3xl text-[#1A1A1A]"
        >
          {heading}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 flex items-center gap-4"
        >
          <p className="text-foreground/70 font-light text-sm tracking-wide">{subheading}</p>
          <span className="w-px h-4 bg-foreground/20" />
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-[#1A1A1A] text-[#1A1A1A]" />
            ))}
            <span className="text-foreground/50 text-xs ml-1">{reviewCount}</span>
          </div>
        </motion.div>
      </section>

      {/* 4-column grid with uniform heights */}
      <section className="px-8 md:px-20 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              data-testid={`testimonial-card-${i}`}
              className="flex flex-col h-full bg-card rounded-2xl border border-black/5 p-6 shadow-sm group hover:shadow-md transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(item.rating)].map((_, s) => (
                  <Star key={s} size={10} className="fill-[#1A1A1A]/80 text-[#1A1A1A]/80" />
                ))}
              </div>

              {/* Quote - flex-grow to make cards uniform */}
              <p className="text-foreground/80 font-light text-sm leading-relaxed mb-6 flex-grow">
                "{item.text}"
              </p>

              {/* Author - pushed to bottom by flex-grow */}
              <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover object-top grayscale opacity-80"
                  />
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">{item.name}</p>
                  <p className="text-foreground/50 text-[11px] font-light">{item.service}</p>
                </div>
                <span className="ml-auto text-foreground/30 text-[10px] font-light">{item.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-black/10 bg-[#F5F5F5] px-8 md:px-20 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#1A1A1A]"
          >
            {language === "vn"
              ? "Sẵn sàng tạo nên câu chuyện của riêng bạn?"
              : "Ready to create your own story?"}
          </motion.p>
          <motion.a
            href="tel:0909203108"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="link-hotline-cta"
            className="inline-block border border-black/20 text-[#1A1A1A] rounded-full text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#1A1A1A] hover:text-white transition-all duration-500"
          >
            {language === "vn" ? "Đặt Lịch Ngay" : "Book Now"}
          </motion.a>
        </div>
      </section>
    </div>
  );
}
