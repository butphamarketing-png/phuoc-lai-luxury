import { createContext, useContext, useState } from "react";

type Lang = "vi" | "en";

interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    training: string;
    portfolio: string;
    bookNow: string;
  };
  hero: {
    tag: string;
    title1: string;
    title2: string;
    desc: string;
    cta: string;
  };
  services: {
    heading: string;
    sub: string;
    items: { title: string; desc: string }[];
  };
  about: {
    tag: string;
    heading: string;
    p1: string;
    p2: string;
    phuocLaiRole: string;
    quynhTamRole: string;
  };
  stats: {
    items: { value: string; label: string }[];
  };
  portfolio: {
    heading: string;
    sub: string;
    viewAll: string;
    items: { title: string; category: string }[];
  };
  training: {
    tag: string;
    heading: string;
    desc: string;
    bullets: string[];
    cta: string;
  };
  testimonials: {
    tag: string;
    heading: string;
    items: { quote: string; author: string; role: string }[];
  };
  booking: {
    heading: string;
    desc: string;
    placeholder: string;
    cta: string;
  };
  footer: {
    tagline: string;
    contactTitle: string;
    exploreTitle: string;
    connectTitle: string;
    links: { label: string; href: string }[];
    copyright: string;
    privacy: string;
    terms: string;
  };
}

const vi: Translations = {
  nav: {
    home: "Trang Chủ",
    about: "Về Chúng Tôi",
    services: "Dịch Vụ",
    training: "Đào Tạo",
    portfolio: "Dự Án",
    bookNow: "Đặt Lịch",
  },
  hero: {
    tag: "Sketch of Wings · Phun Xăm Thẩm Mỹ",
    title1: "Nâng Tầm Thần Thái",
    title2: "Từ Từng Sợi Mày",
    desc: "Phuoc Lai Luxury — Nghệ thuật phun xăm đỉnh cao, kiến tạo vẻ đẹp hoàn mỹ không tì vết. Đẳng cấp làm nên thương hiệu.",
    cta: "Khám Phá Dịch Vụ",
  },
  services: {
    heading: "Dịch Vụ Đẳng Cấp",
    sub: "Bậc Thầy Kiến Tạo Nét Đẹp",
    items: [
      { title: "Phun Mày Sexy Brows", desc: "Kỹ thuật tạo sợi siêu thực, tự nhiên như lông mày thật." },
      { title: "Phun Môi Luxury", desc: "Khử thâm, tạo màu môi căng mọng, quyến rũ không cần son." },
      { title: "Phun Mi Eyeliner", desc: "Tạo ánh nhìn sắc nét, mí mắt to tròn, sâu thẳm tự nhiên." },
      { title: "Phun Khắc Sợi", desc: "Kết hợp giữa phun shading và điêu khắc sợi tinh tế." },
      { title: "Xoá Sẹo & Xoá Xăm Hỏng", desc: "Điều trị sẹo, xoá vết xăm cũ an toàn, không để lại dấu vết." },
      { title: "Chăm Sóc Hậu Phun", desc: "Dịch vụ premium chăm sóc sau xăm giúp màu bền đẹp hoàn hảo." },
    ],
  },
  about: {
    tag: "Về Chúng Tôi",
    heading: "Sự Kết Hợp Của Kỹ Thuật Đỉnh Cao & Tâm Hồn Nghệ Sĩ",
    p1: "Tại Phuoc Lai Luxury, chúng tôi không chỉ làm đẹp, chúng tôi kiến tạo lại sự tự tin. Master Phuoc Lai với hơn 8 năm tu nghiệp và thực hành, mang đến tiêu chuẩn thẩm mỹ quốc tế cho phụ nữ Việt.",
    p2: "Cùng với Quỳnh Tâm, chúng tôi xây dựng một thương hiệu dựa trên sự hoàn hảo, tinh tế và chuyên nghiệp tuyệt đối. Mỗi đường nét, mỗi màu sắc đều được tính toán với độ chính xác đến từng milimet.",
    phuocLaiRole: "Master Artist",
    quynhTamRole: "Đại Sứ Thương Hiệu",
  },
  stats: {
    items: [
      { value: "1000+", label: "Khách Hàng Hài Lòng" },
      { value: "8+", label: "Năm Kinh Nghiệm" },
      { value: "200+", label: "Học Viên Tốt Nghiệp" },
      { value: "100%", label: "Cam Kết Chất Lượng" },
    ],
  },
  portfolio: {
    heading: "Dự Án Nổi Bật",
    sub: "Nghệ Thuật Khắc Hoạ Vẻ Đẹp",
    viewAll: "Xem Tất Cả",
    items: [
      { title: "Sexy Brows", category: "Phun Mày" },
      { title: "Luxury Lips", category: "Phun Môi" },
      { title: "Classic Eyeliner", category: "Phun Mi" },
    ],
  },
  training: {
    tag: "Học Viện Phuoc Lai",
    heading: "Truyền Lửa Đam Mê & Khởi Nghiệp Cùng PMU",
    desc: "Khóa học Permanent Makeup chuyên nghiệp từ cơ bản đến nâng cao. Đào tạo 1 kèm 1 hoặc nhóm nhỏ, đảm bảo chất lượng đầu ra.",
    bullets: [
      "Kỹ thuật phun mày, môi, mí chuẩn Châu Âu",
      "Hỗ trợ setup studio và chiến lược Marketing",
      "Cấp chứng chỉ hành nghề chuẩn quốc gia",
    ],
    cta: "Tìm Hiểu Khóa Học",
  },
  testimonials: {
    tag: "Đánh Giá Khách Hàng",
    heading: "Lời Khẳng Định Từ Sự Hài Lòng",
    items: [
      {
        quote: "Không thể tin được đôi lông mày của mình lại có thể tự nhiên và sắc sảo đến vậy. Master Phước Lài thực sự là một nghệ sĩ.",
        author: "Lê Nguyễn",
        role: "Khách Hàng Phun Mày",
      },
      {
        quote: "Môi sau bong màu cực kỳ trong và đẹp. Không sưng, không đau. Dịch vụ chăm sóc khách hàng ở đây rất chu đáo và chuyên nghiệp.",
        author: "Trần Mai",
        role: "Khách Hàng Phun Môi",
      },
    ],
  },
  booking: {
    heading: "Sẵn Sàng Cho Sự Thay Đổi?",
    desc: "Đặt lịch tư vấn miễn phí ngay hôm nay để chuyên gia của chúng tôi kiến tạo vẻ đẹp dành riêng cho bạn.",
    placeholder: "Số điện thoại của bạn",
    cta: "Gọi Lại Cho Tôi",
  },
  footer: {
    tagline: "Phuoc Lai Luxury - Nơi tôn vinh vẻ đẹp hoàn mỹ. Chúng tôi tự hào mang đến dịch vụ phun xăm thẩm mỹ đẳng cấp quốc tế tại Vũng Tàu.",
    contactTitle: "Liên Hệ",
    exploreTitle: "Khám Phá",
    connectTitle: "Kết Nối",
    links: [
      { label: "Về Chúng Tôi", href: "#about" },
      { label: "Dịch Vụ", href: "#services" },
      { label: "Đào Tạo", href: "#training" },
      { label: "Dự Án", href: "#portfolio" },
    ],
    copyright: "© 2024 Phuoc Lai Luxury. All Rights Reserved.",
    privacy: "Chính Sách Bảo Mật",
    terms: "Điều Khoản Dịch Vụ",
  },
};

const en: Translations = {
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    training: "Training",
    portfolio: "Portfolio",
    bookNow: "Book Now",
  },
  hero: {
    tag: "Sketch of Wings · Permanent Makeup",
    title1: "Elevate Your Presence",
    title2: "One Stroke at a Time",
    desc: "Phuoc Lai Luxury — The pinnacle of permanent makeup artistry. Flawless beauty crafted with surgical precision. Excellence defines our brand.",
    cta: "Explore Services",
  },
  services: {
    heading: "Premium Services",
    sub: "Masters of Beauty Craftsmanship",
    items: [
      { title: "Sexy Brows PMU", desc: "Ultra-realistic hair-stroke technique — indistinguishable from natural brows." },
      { title: "Luxury Lip Blush", desc: "Neutralise dark pigmentation, achieve plump natural colour without lipstick." },
      { title: "Eyeliner PMU", desc: "Sharp, defined eyes with a deep, naturally wide-open look." },
      { title: "Microblading & Shading", desc: "A fusion of shading and fine hair-stroke sculpting for dimensional brows." },
      { title: "Scar & Tattoo Removal", desc: "Safe, trace-free treatment to correct scars and unwanted old tattoos." },
      { title: "Premium Aftercare", desc: "Post-procedure care program to preserve colour vibrancy and lasting results." },
    ],
  },
  about: {
    tag: "About Us",
    heading: "Where Master Technique Meets the Soul of an Artist",
    p1: "At Phuoc Lai Luxury, we don't just beautify — we rebuild confidence. Master Phuoc Lai brings over 8 years of refined practice and international aesthetic standards to Vietnamese women.",
    p2: "Together with Quynh Tam, we have built a brand rooted in absolute perfection, refinement, and professionalism. Every stroke, every shade is calculated to the millimetre.",
    phuocLaiRole: "Master Artist",
    quynhTamRole: "Brand Ambassador",
  },
  stats: {
    items: [
      { value: "1000+", label: "Satisfied Clients" },
      { value: "8+", label: "Years of Experience" },
      { value: "200+", label: "Graduates" },
      { value: "100%", label: "Quality Commitment" },
    ],
  },
  portfolio: {
    heading: "Featured Projects",
    sub: "The Art of Beauty Sculpting",
    viewAll: "View All",
    items: [
      { title: "Sexy Brows", category: "Brow PMU" },
      { title: "Luxury Lips", category: "Lip Blush" },
      { title: "Classic Eyeliner", category: "Eyeliner PMU" },
    ],
  },
  training: {
    tag: "Phuoc Lai Academy",
    heading: "Ignite Your Passion & Launch Your PMU Career",
    desc: "Professional Permanent Makeup courses from beginner to advanced. Private 1-on-1 or small group training — quality outcomes guaranteed.",
    bullets: [
      "European-standard brow, lip & eyeliner techniques",
      "Studio setup support & marketing strategy",
      "Nationally accredited professional certification",
    ],
    cta: "Explore Courses",
  },
  testimonials: {
    tag: "Client Reviews",
    heading: "Testimonials of Excellence",
    items: [
      {
        quote: "I can't believe how natural and defined my brows look now. Master Phuoc Lai is truly an artist beyond compare.",
        author: "Le Nguyen",
        role: "Brow PMU Client",
      },
      {
        quote: "The colour after healing is incredibly vivid and natural. No swelling, no pain. The aftercare service here is thorough and professional.",
        author: "Tran Mai",
        role: "Lip Blush Client",
      },
    ],
  },
  booking: {
    heading: "Ready for Your Transformation?",
    desc: "Book a free consultation today and let our experts craft a look made uniquely for you.",
    placeholder: "Your phone number",
    cta: "Call Me Back",
  },
  footer: {
    tagline: "Phuoc Lai Luxury — Celebrating flawless beauty. We proudly deliver world-class permanent makeup services in Vung Tau.",
    contactTitle: "Contact",
    exploreTitle: "Explore",
    connectTitle: "Connect",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Training", href: "#training" },
      { label: "Portfolio", href: "#portfolio" },
    ],
    copyright: "© 2024 Phuoc Lai Luxury. All Rights Reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
};

const dict: Record<Lang, Translations> = { vi, en };

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "vi",
  setLang: () => {},
  t: vi,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("vi");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
