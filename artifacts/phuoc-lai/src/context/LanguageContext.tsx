import { createContext, useContext, useState } from "react";

type Lang = "vi" | "en";

interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    pricing: string;
    training: string;
    portfolio: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    tag: string;
    title1: string;
    title2: string;
    desc: string;
    cta: string;
    student: string;
    studentRole: string;
    expert: string;
    expertRole: string;
  };
  services: {
    items: { title: string; desc: string; icon: string }[];
    readMore: string;
  };
  about: {
    tag: string;
    heading: string;
    p1: string;
    p2: string;
    phuocLaiRole: string;
    quynhTamRole: string;
    cta: string;
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
  whyChooseUs: {
    heading: string;
    desc: string;
    cta: string;
    features: { title: string; desc: string }[];
  };
  training: {
    heading: string;
    desc: string;
    viewAll: string;
    courses: { title: string; subtitle: string; desc: string; duration: string }[];
  };
  testimonials: {
    heading: string;
    items: { quote: string; author: string; role: string }[];
  };
  instagram: {
    heading: string;
    sub: string;
    viewMore: string;
  };
  cta: {
    heading1: string;
    heading2: string;
    sub: string;
    button: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    services: string;
    contact: string;
    connect: string;
    links: { label: string; href: string }[];
    serviceLinks: { label: string; href: string }[];
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
    pricing: "Bảng Giá",
    training: "Đào Tạo",
    portfolio: "Dự Án",
    contact: "Liên Hệ",
    bookNow: "BOOK NOW +",
  },
  hero: {
    tag: "PRIVATE 1:1 COURSE",
    title1: "AMAZING",
    title2: "BROWS",
    desc: "SUPERIOR TECHNIQUE",
    cta: "BOOK NOW +",
    student: "QUYNH TAM",
    studentRole: "STUDENT",
    expert: "PHUOC LAI",
    expertRole: "PMU EXPERT"
  },
  services: {
    items: [
      { icon: "feather", title: "PERMANENT MAKEUP", desc: "Điêu khắc sợi, phun mày công nghệ mới, lên màu chuẩn đẹp tự nhiên." },
      { icon: "cap", title: "TRAINING COURSE", desc: "Đào tạo học viên 1:1, giáo trình độc quyền, thực hành chuyên sâu." },
      { icon: "face", title: "BEAUTY CONSULTATION", desc: "Tư vấn dáng mày phù hợp khuôn mặt, phong cách và thần thái cá nhân." },
      { icon: "leaf", title: "AFTERCARE PREMIUM", desc: "Chăm sóc hậu phun chuẩn quy trình, đảm bảo kết quả bền đẹp." },
    ],
    readMore: "XEM THÊM →"
  },
  about: {
    tag: "OUR STORY",
    heading: "NÂNG TẦM THẦN THÁI / TỪ TỪNG SỢI MÀY",
    p1: "Tại Phuoc Lai Luxury, chúng tôi không chỉ làm đẹp, chúng tôi kiến tạo lại sự tự tin. Master Phuoc Lai với hơn 8 năm tu nghiệp và thực hành, mang đến tiêu chuẩn thẩm mỹ quốc tế cho phụ nữ Việt.",
    p2: "Cùng với Quỳnh Tâm, chúng tôi xây dựng một thương hiệu dựa trên sự hoàn hảo, tinh tế và chuyên nghiệp tuyệt đối. Mỗi đường nét, mỗi màu sắc đều được tính toán với độ chính xác đến từng milimet.",
    phuocLaiRole: "PMU EXPERT",
    quynhTamRole: "STUDENT",
    cta: "VỀ CHÚNG TÔI +"
  },
  stats: {
    items: [
      { value: "1000+", label: "KHÁCH HÀNG HÀI LÒNG" },
      { value: "8+", label: "NĂM KINH NGHIỆM" },
      { value: "200+", label: "HỌC VIÊN TỐT NGHIỆP" },
      { value: "100%", label: "CAM KẾT CHẤT LƯỢNG" },
    ],
  },
  portfolio: {
    heading: "DỰ ÁN NỔI BẬT",
    sub: "Bộ sưu tập những kết quả thực tế từ khách hàng & học viên.",
    viewAll: "XEM THÊM DỰ ÁN +",
    items: [
      { title: "Sợi Tự Nhiên", category: "Hair Stroke" },
      { title: "Phun Shadow", category: "Soft Powder Brows" },
      { title: "Ombre Brows", category: "Ombre Brows" },
      { title: "Combo Brows", category: "Combo Brows" },
      { title: "Dáng Mày Tự Nhiên", category: "Natural Shape" }
    ],
  },
  whyChooseUs: {
    heading: "VÌ SAO CHỌN AMAZING BROWS?",
    desc: "Chúng tôi mang đến những giải pháp thẩm mỹ hàng đầu, giúp bạn sở hữu vẻ đẹp tự nhiên và hoàn hảo nhất.",
    cta: "TÌM HIỂU THÊM +",
    features: [
      { title: "KỸ THUẬT ĐỘC QUYỀN", desc: "Sử dụng công nghệ điêu khắc sợi mới nhất." },
      { title: "MỰC PHUN ORGANIC", desc: "100% mực hữu cơ an toàn cho da." },
      { title: "AN TOÀN TUYỆT ĐỐI", desc: "Quy trình chuẩn y khoa, không sưng đau." },
      { title: "CHUYÊN GIA HÀNG ĐẦU", desc: "Thực hiện bởi Master nhiều năm kinh nghiệm." },
      { title: "BẢO HÀNH DÀI HẠN", desc: "Chính sách bảo hành rõ ràng, uy tín." }
    ]
  },
  training: {
    heading: "KHÓA HỌC ĐÀO TẠO",
    desc: "Chương trình đào tạo chuyên nghiệp từ cơ bản đến nâng cao, giúp làm chủ kỹ thuật và tự tin hành nghề.",
    viewAll: "XEM TẤT CẢ KHÓA HỌC →",
    courses: [
      { title: "KHÓA CƠ BẢN", subtitle: "BROWS MASTER", desc: "Dành cho người bắt đầu muốn học nghề, nắm vững nền tảng kỹ thuật phun xăm", duration: "THỜI GIAN: 3 NGÀY" },
      { title: "KHÓA NÂNG CAO", subtitle: "BROWS EXPERT", desc: "Nâng cao kỹ năng để chinh phục kỹ thuật shading, combo và tạo dáng phức tạp", duration: "THỜI GIAN: 7 NGÀY" },
      { title: "KHÓA CHUYÊN SÂU", subtitle: "MASTER ADVANCED", desc: "Chuyên sâu, thi thực hành trực tiếp trên model, nâng cao thao tác chuyên nghiệp", duration: "THỜI GIAN: 10 NGÀY" },
      { title: "KHÓA BUSINESS", subtitle: "BROWS & BEYOND", desc: "Kỹ năng kinh doanh, mở studio, vận hành và phát triển thương hiệu cá nhân", duration: "THỜI GIAN: 3 NGÀY" }
    ]
  },
  testimonials: {
    heading: "KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI",
    items: [
      {
        quote: "Không thể tin được đôi lông mày của mình lại có thể tự nhiên và sắc sảo đến vậy. Master Phước Lài thực sự là một nghệ sĩ.",
        author: "Thùy Linh",
        role: "Khách Hàng Phun Mày",
      },
      {
        quote: "Môi sau bong màu cực kỳ trong và đẹp. Không sưng, không đau. Dịch vụ chăm sóc khách hàng ở đây rất chu đáo và chuyên nghiệp.",
        author: "Minh Anh",
        role: "Khách Hàng Phun Môi",
      },
      {
        quote: "Đã từng làm hỏng mày ở nơi khác, đến đây được sửa lại dáng cực chuẩn, màu lên siêu tự nhiên. Rất hài lòng!",
        author: "Hoàng Yến",
        role: "Khách Hàng Sửa Mày",
      }
    ],
  },
  instagram: {
    heading: "FOLLOW US ON INSTAGRAM",
    sub: "@amazingbrows.vn",
    viewMore: "XEM THÊM →"
  },
  cta: {
    heading1: "SẴN SÀNG ĐỂ SỞ HỮU",
    heading2: "DÁNG MÀY HOÀN HẢO?",
    sub: "Đặt lịch tư vấn ngay hôm nay để được chuyên gia AMAZING BROWS tư vấn miễn phí.",
    button: "ĐẶT LỊCH NGAY +"
  },
  footer: {
    tagline: "Sketch of Wings Phuoc Lai Permanent Makeup",
    quickLinks: "LIÊN KẾT NHANH",
    services: "DỊCH VỤ",
    contact: "THÔNG TIN LIÊN HỆ",
    connect: "KẾT NỐI VỚI CHÚNG TÔI",
    links: [
      { label: "Trang chủ", href: "#hero" },
      { label: "Về chúng tôi", href: "#about" },
      { label: "Dịch vụ", href: "#services" },
      { label: "Bảng giá", href: "#pricing" },
      { label: "Đào tạo", href: "#training" },
      { label: "Dự án", href: "#portfolio" },
      { label: "Liên hệ", href: "#contact" },
    ],
    serviceLinks: [
      { label: "Phun mày", href: "#" },
      { label: "Phun khắc sợi", href: "#" },
      { label: "Phun mi", href: "#" },
      { label: "Phun môi", href: "#" },
      { label: "Xoá sẹo", href: "#" },
      { label: "Chăm sóc hậu phun", href: "#" },
    ],
    copyright: "© 2024 AMAZING BROWS. All rights reserved.",
    privacy: "Chính sách bảo mật",
    terms: "Điều khoản sử dụng",
  },
};

const en: Translations = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    pricing: "Pricing",
    training: "Training",
    portfolio: "Portfolio",
    contact: "Contact",
    bookNow: "BOOK NOW +",
  },
  hero: {
    tag: "PRIVATE 1:1 COURSE",
    title1: "AMAZING",
    title2: "BROWS",
    desc: "SUPERIOR TECHNIQUE",
    cta: "BOOK NOW +",
    student: "QUYNH TAM",
    studentRole: "STUDENT",
    expert: "PHUOC LAI",
    expertRole: "PMU EXPERT"
  },
  services: {
    items: [
      { icon: "feather", title: "PERMANENT MAKEUP", desc: "Advanced hair stroke and shading techniques for flawless natural brows." },
      { icon: "cap", title: "TRAINING COURSE", desc: "Private 1:1 academy, exclusive curriculum, deep practical training." },
      { icon: "face", title: "BEAUTY CONSULTATION", desc: "Personalised brow shaping tailored to your unique facial structure." },
      { icon: "leaf", title: "AFTERCARE PREMIUM", desc: "Medical-grade aftercare protocol ensuring lasting, beautiful results." },
    ],
    readMore: "READ MORE →"
  },
  about: {
    tag: "OUR STORY",
    heading: "ELEVATING ELEGANCE / ONE STROKE AT A TIME",
    p1: "At Phuoc Lai Luxury, we don't just beautify — we rebuild confidence. Master Phuoc Lai brings over 8 years of refined practice and international aesthetic standards to our clients.",
    p2: "Together with Quynh Tam, we have built a brand rooted in absolute perfection, refinement, and professionalism. Every stroke, every shade is calculated to the millimetre.",
    phuocLaiRole: "PMU EXPERT",
    quynhTamRole: "STUDENT",
    cta: "ABOUT US +"
  },
  stats: {
    items: [
      { value: "1000+", label: "HAPPY CLIENTS" },
      { value: "8+", label: "YEARS EXPERIENCE" },
      { value: "200+", label: "GRADUATES" },
      { value: "100%", label: "QUALITY ASSURANCE" },
    ],
  },
  portfolio: {
    heading: "FEATURED PROJECTS",
    sub: "A collection of real results from our clients & students.",
    viewAll: "VIEW MORE PROJECTS +",
    items: [
      { title: "Natural Strokes", category: "Hair Stroke" },
      { title: "Soft Shading", category: "Soft Powder Brows" },
      { title: "Ombre Brows", category: "Ombre Brows" },
      { title: "Combo Brows", category: "Combo Brows" },
      { title: "Natural Shape", category: "Natural Shape" }
    ],
  },
  whyChooseUs: {
    heading: "WHY CHOOSE AMAZING BROWS?",
    desc: "We provide top-tier aesthetic solutions, helping you achieve the most natural and perfect beauty.",
    cta: "DISCOVER MORE +",
    features: [
      { title: "EXCLUSIVE TECHNIQUE", desc: "Using the latest hair stroke sculpting technology." },
      { title: "ORGANIC PIGMENTS", desc: "100% skin-safe organic pigments." },
      { title: "ABSOLUTE SAFETY", desc: "Medical-standard procedure, painless experience." },
      { title: "TOP EXPERTS", desc: "Performed by Masters with years of experience." },
      { title: "LONG-TERM WARRANTY", desc: "Clear and reliable warranty policy." }
    ]
  },
  training: {
    heading: "TRAINING ACADEMY",
    desc: "Professional training programs from basic to advanced, helping you master techniques and start your career.",
    viewAll: "VIEW ALL COURSES →",
    courses: [
      { title: "BASIC COURSE", subtitle: "BROWS MASTER", desc: "For beginners looking to build a strong foundation in PMU techniques", duration: "DURATION: 3 DAYS" },
      { title: "ADVANCED COURSE", subtitle: "BROWS EXPERT", desc: "Elevate your skills in complex shading, combo, and shaping", duration: "DURATION: 7 DAYS" },
      { title: "MASTERCLASS", subtitle: "MASTER ADVANCED", desc: "Intensive hands-on practice on models, advanced professional operations", duration: "DURATION: 10 DAYS" },
      { title: "BUSINESS COURSE", subtitle: "BROWS & BEYOND", desc: "Business strategy, studio setup, and personal branding development", duration: "DURATION: 3 DAYS" }
    ]
  },
  testimonials: {
    heading: "WHAT OUR CLIENTS SAY",
    items: [
      {
        quote: "I can't believe how natural and defined my brows look now. Master Phuoc Lai is truly an artist beyond compare.",
        author: "Thuy Linh",
        role: "Brow PMU Client",
      },
      {
        quote: "The colour after healing is incredibly vivid and natural. No swelling, no pain. The aftercare service here is thorough and professional.",
        author: "Minh Anh",
        role: "Lip Blush Client",
      },
      {
        quote: "Had a bad experience elsewhere, but they fixed my brow shape perfectly here. The colour is super natural. Highly recommended!",
        author: "Hoang Yen",
        role: "Correction Client",
      }
    ],
  },
  instagram: {
    heading: "FOLLOW US ON INSTAGRAM",
    sub: "@amazingbrows.vn",
    viewMore: "VIEW MORE →"
  },
  cta: {
    heading1: "READY TO OWN",
    heading2: "THE PERFECT BROWS?",
    sub: "Book a free consultation today and let our AMAZING BROWS experts craft a look made uniquely for you.",
    button: "BOOK APPOINTMENT +"
  },
  footer: {
    tagline: "Sketch of Wings Phuoc Lai Permanent Makeup",
    quickLinks: "QUICK LINKS",
    services: "SERVICES",
    contact: "CONTACT INFO",
    connect: "CONNECT WITH US",
    links: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Pricing", href: "#pricing" },
      { label: "Training", href: "#training" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Contact", href: "#contact" },
    ],
    serviceLinks: [
      { label: "Brow PMU", href: "#" },
      { label: "Hair Strokes", href: "#" },
      { label: "Eyeliner", href: "#" },
      { label: "Lip Blush", href: "#" },
      { label: "Scar Camouflage", href: "#" },
      { label: "Premium Aftercare", href: "#" },
    ],
    copyright: "© 2024 AMAZING BROWS. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
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
