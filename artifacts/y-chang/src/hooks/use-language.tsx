import { useState, createContext, useContext } from "react";

type Language = "vn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  vn: {
    "nav.home": "TRANG CHỦ",
    "nav.about": "VỀ CHÚNG TÔI",
    "nav.services": "DỊCH VỤ",
    "nav.training": "ĐÀO TẠO",
    "nav.feedback": "FEEDBACK",
    "nav.contact": "LIÊN HỆ",
    "nav.booking": "BOOKING",
    
    "hero.subtitle": "Nét Đẹp Tự Nhiên, Thanh Lịch Vượt Thời Gian",
    "hero.desc": "Kiến tạo vẻ đẹp hoàn mỹ qua từng đường nét điêu khắc tinh tế. Phuoc Lai mang đến sự tự tin với diện mạo rạng rỡ mỗi ngày.",
    "hero.cta": "Khám Phá Ngay",

    "home.about.title": "Nghệ Thuật Của Sự Tinh Tế",
    "home.about.desc1": "Tại Phuoc Lai, chúng tôi tin rằng vẻ đẹp thực sự không nằm ở sự cầu kỳ, mà ở sự tinh tế vừa đủ để tôn lên những nét tự nhiên vốn có của bạn.",
    "home.about.desc2": "Với đội ngũ chuyên gia giàu kinh nghiệm, kỹ thuật điêu khắc hiện đại và mực xăm hữu cơ an toàn tuyệt đối, mỗi tác phẩm là một lời cam kết về chất lượng và sự hoàn hảo.",
    "home.about.cta": "Xem thêm",

    "home.services.title": "Dấu Ấn Chuyên Biệt",
    "home.services.brows.title": "Điêu Khắc Chân Mày",
    "home.services.brows.desc": "Kỹ thuật tạo sợi siêu thực, mô phỏng chính xác chiều mọc của lông mày thật.",
    "home.services.lips.title": "Phun Môi Vi Chạm",
    "home.services.lips.desc": "Khắc phục triệt để tình trạng môi thâm, mang lại đôi môi căng mọng tự nhiên.",
    "home.services.ombre.title": "Ombre Brows",
    "home.services.ombre.desc": "Hiệu ứng rải hạt vi điểm tạo độ chuyển màu nhạt ở đầu và đậm dần về đuôi.",
    "home.services.correction.title": "Xử Lý Chân Mày Cũ",
    "home.services.correction.desc": "Chỉnh sửa, hút dung dịch, laser xóa xăm cũ an toàn và hiệu quả.",
    
    "home.training.title": "Phuoc Lai Academy",
    "home.training.desc": "Ươm mầm tài năng thẩm mỹ với lộ trình đào tạo bài bản 1 kèm 1.",
    
    "home.feedback.title": "Lời Chứng Thực",
    
    "home.why.title": "Vì Sao Chọn Phuoc Lai",
    "home.why.1.title": "Mực Hữu Cơ 100%",
    "home.why.1.desc": "Organic cao cấp Châu Âu.",
    "home.why.2.title": "Kỹ Thuật Độc Quyền",
    "home.why.2.desc": "Không sưng, không đau.",
    "home.why.3.title": "Master Chuyên Nghiệp",
    "home.why.3.desc": "Nhiều năm kinh nghiệm.",
    "home.why.4.title": "Bảo Hành Dài Hạn",
    "home.why.4.desc": "Chế độ hậu mãi chu đáo.",

    "home.booking.title": "Sẵn Sàng Tỏa Sáng?",
    "home.booking.desc": "Đặt lịch tư vấn ngay hôm nay để nhận được những gợi ý thiết kế phù hợp nhất.",
    "home.booking.cta": "Đặt Lịch Ngay",

    "footer.desc": "Nghệ thuật điêu khắc và phun xăm thẩm mỹ cao cấp. Mang lại vẻ đẹp tự nhiên, thanh lịch và bền vững.",
    "footer.links": "Khám Phá",
    "footer.services": "Dịch Vụ",
    "footer.contact": "Liên Hệ",

    "contact.title": "Liên Hệ",
    "contact.name": "Họ và tên",
    "contact.phone": "Số điện thoại",
    "contact.service": "Dịch vụ quan tâm",
    "contact.note": "Ghi chú",
    "contact.submit": "Gửi",

    "booking.title": "Đặt Lịch Hẹn",
    "booking.desc": "Để lại thông tin, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
  },
  en: {
    "nav.home": "HOME",
    "nav.about": "ABOUT",
    "nav.services": "SERVICES",
    "nav.training": "TRAINING",
    "nav.feedback": "FEEDBACK",
    "nav.contact": "CONTACT",
    "nav.booking": "BOOKING",

    "hero.subtitle": "Natural Beauty, Timeless Elegance",
    "hero.desc": "Creating perfect beauty through delicate sculpting lines. Phuoc Lai brings confidence with a radiant look every day.",
    "hero.cta": "Discover Now",

    "home.about.title": "The Art of Refinement",
    "home.about.desc1": "At Phuoc Lai, we believe that true beauty lies not in fussiness, but in just enough refinement to enhance your natural features.",
    "home.about.desc2": "With an experienced team of experts, modern sculpting techniques and absolutely safe organic tattoo ink, every work is a commitment to quality and perfection.",
    "home.about.cta": "Read more",

    "home.services.title": "Signature Services",
    "home.services.brows.title": "Eyebrow Sculpting",
    "home.services.brows.desc": "Hyper-realistic stroke technique, accurately simulating the growth direction of real eyebrows.",
    "home.services.lips.title": "Micro-touch Lip Blushing",
    "home.services.lips.desc": "Completely overcome dark lips, bringing natural plump lips.",
    "home.services.ombre.title": "Ombre Brows",
    "home.services.ombre.desc": "Micro-dot scattering effect creates a light color transition at the head and gradually darkens towards the tail.",
    "home.services.correction.title": "Old Eyebrow Correction",
    "home.services.correction.desc": "Safe and effective correction, solution extraction, and laser tattoo removal.",

    "home.training.title": "Phuoc Lai Academy",
    "home.training.desc": "Nurturing aesthetic talents with a systematic 1-on-1 training route.",

    "home.feedback.title": "Testimonials",

    "home.why.title": "Why Choose Phuoc Lai",
    "home.why.1.title": "100% Organic Ink",
    "home.why.1.desc": "Premium European Organic.",
    "home.why.2.title": "Exclusive Technique",
    "home.why.2.desc": "No swelling, no pain.",
    "home.why.3.title": "Professional Master",
    "home.why.3.desc": "Years of experience.",
    "home.why.4.title": "Long-term Warranty",
    "home.why.4.desc": "Thoughtful after-sales.",

    "home.booking.title": "Ready to Shine?",
    "home.booking.desc": "Book a consultation today to receive the most suitable design suggestions.",
    "home.booking.cta": "Book Now",

    "footer.desc": "High-end aesthetic sculpting and permanent makeup art. Bringing natural, elegant, and sustainable beauty.",
    "footer.links": "Discover",
    "footer.services": "Services",
    "footer.contact": "Contact Us",

    "contact.title": "Contact Us",
    "contact.name": "Full Name",
    "contact.phone": "Phone Number",
    "contact.service": "Service of Interest",
    "contact.note": "Notes",
    "contact.submit": "Submit",

    "booking.title": "Book Appointment",
    "booking.desc": "Leave your info, we will contact you shortly.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("vn");

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["vn"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
