import { createContext, useContext, useState } from "react";

type Lang = "vi" | "en";

export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    training: string;
    feedback: string;
    contact: string;
    bookNow: string;
    servicesDropdown: {
      s1: string;
      s2: string;
      s3: string;
      s4: string;
    };
    trainingDropdown: {
      t1: string;
      t2: string;
      t3: string;
      t4: string;
    };
  };
  home: {
    hero: {
      slide1: string;
    };
    intro: {
      label: string;
      title: string;
      desc: string;
      btn: string;
    };
    services: {
      label: string;
      title: string;
      btn: string;
      items: Array<{ title: string; desc: string }>;
    };
    training: {
      label: string;
      title: string;
      desc: string;
      btn: string;
      courses: Array<{ title: string; desc: string; duration: string }>;
    };
    feedback: {
      title: string;
      items: Array<{ name: string; role: string; quote: string }>;
    };
    whyChoose: {
      title: string;
      items: Array<{ title: string; desc: string; icon: string }>;
    };
    booking: {
      label: string;
      title: string;
      desc: string;
      form: {
        name: string;
        phone: string;
        date: string;
        time: string;
        service: string;
        note: string;
        submit: string;
      };
    };
    social: {
      label: string;
      title: string;
    };
  };
  footer: {
    tagline: string;
    quickLinks: string;
    services: string;
    training: string;
    contact: string;
    copyright: string;
    connect: string;
    privacy: string;
    terms: string;
    links: Array<{ label: string; href: string }>;
    serviceLinks: Array<{ label: string; href: string }>;
  };
  about: {
    title: string;
    content: string;
  };
  servicesPage: {
    title: string;
  };
  trainingPage: {
    title: string;
  };
  feedbackPage: {
    title: string;
  };
  contactPage: {
    title: string;
  };
}

const vi: Translations = {
  nav: {
    home: "Trang Chủ",
    about: "Về Chúng Tôi",
    services: "Dịch Vụ",
    training: "Đào Tạo",
    feedback: "Feedback",
    contact: "Liên Hệ",
    bookNow: "BOOKING",
    servicesDropdown: {
      s1: "Điêu Khắc Sợi",
      s2: "Phun Mày Ombre",
      s3: "Combo Brows",
      s4: "Xử Lý Mày Hỏng",
    },
    trainingDropdown: {
      t1: "Khóa Cơ Bản Brows Master",
      t2: "Khóa Nâng Cao Brows Expert",
      t3: "Khóa Chuyên Sâu Master Advanced",
      t4: "Khóa Business Brows & Beyond",
    },
  },
  home: {
    hero: {
      slide1: "",
    },
    intro: {
      label: "AMAZING BROWS",
      title: "Nâng tầm thần thái từ từng sợi mày",
      desc: "Tại Phuoc Lai Luxury, chúng tôi không chỉ làm đẹp, chúng tôi kiến tạo lại sự tự tin. Mang đến tiêu chuẩn thẩm mỹ quốc tế cho phụ nữ Việt.",
      btn: "XEM THÊM →",
    },
    services: {
      label: "DỊCH VỤ CỦA CHÚNG TÔI",
      title: "Đẹp tự nhiên – Chuẩn từng chi tiết",
      btn: "XEM TẤT CẢ DỊCH VỤ →",
      items: [
        { title: "ĐIÊU KHẮC SỢI", desc: "Kỹ thuật phẩy sợi tự nhiên, tệp hoàn toàn với lông mày thật." },
        { title: "PHUN MÀY OMBRE", desc: "Hiệu ứng rải hạt vi chạm mang lại vẻ đẹp sắc sảo, mềm mại." },
        { title: "COMBO BROWS", desc: "Kết hợp hoàn hảo giữa điêu khắc và phun ombre." },
        { title: "XỬ LÝ MÀY HỎNG", desc: "Sửa chữa, hút dung dịch và tạo dáng lại chuẩn tỷ lệ vàng." },
      ],
    },
    training: {
      label: "CHƯƠNG TRÌNH ĐÀO TẠO",
      title: "Học thật – Làm thật – Thành công thật",
      desc: "Chương trình đào tạo chuyên nghiệp từ cơ bản đến nâng cao, giúp làm chủ kỹ thuật và tự tin hành nghề.",
      btn: "XEM TẤT CẢ KHÓA HỌC →",
      courses: [
        { title: "KHÓA CƠ BẢN", desc: "Nắm vững nền tảng kỹ thuật phun xăm", duration: "THỜI GIAN: 3 NGÀY" },
        { title: "KHÓA NÂNG CAO", desc: "Chinh phục kỹ thuật shading, combo", duration: "THỜI GIAN: 7 NGÀY" },
        { title: "KHÓA CHUYÊN SÂU", desc: "Thi thực hành trực tiếp trên model", duration: "THỜI GIAN: 10 NGÀY" },
        { title: "KHÓA BUSINESS", desc: "Mở studio, vận hành thương hiệu", duration: "THỜI GIAN: 3 NGÀY" },
      ],
    },
    feedback: {
      title: "Những lời yêu thương là động lực của chúng tôi",
      items: [
        { name: "Thùy Linh", role: "Khách Hàng Phun Mày", quote: "Không thể tin được đôi lông mày của mình lại có thể tự nhiên và sắc sảo đến vậy. Master Phước Lài thực sự là một nghệ sĩ." },
        { name: "Minh Anh", role: "Khách Hàng Phun Môi", quote: "Môi sau bong màu cực kỳ trong và đẹp. Không sưng, không đau. Dịch vụ chăm sóc ở đây rất chu đáo và chuyên nghiệp." },
        { name: "Hoàng Yến", role: "Khách Hàng Sửa Mày", quote: "Đã từng làm hỏng mày ở nơi khác, đến đây được sửa lại dáng cực chuẩn, màu lên siêu tự nhiên. Rất hài lòng!" },
        { name: "Ngọc Bích", role: "Học Viên Brows Master", quote: "Khóa học rất thực tế và chi tiết. Cô giáo tận tình chỉ dạy từng đường kim. Đã tự tin mở tiệm sau khi tốt nghiệp." },
      ],
    },
    whyChoose: {
      title: "VÌ SAO CHỌN AMAZING BROWS?",
      items: [
        { title: "KỸ THUẬT ĐỘC QUYỀN", desc: "Sử dụng công nghệ điêu khắc sợi mới nhất.", icon: "diamond" },
        { title: "MỰC PHUN ORGANIC", desc: "100% mực hữu cơ an toàn cho da.", icon: "leaf" },
        { title: "AN TOÀN TUYỆT ĐỐI", desc: "Quy trình chuẩn y khoa, không sưng đau.", icon: "shield" },
        { title: "CHUYÊN GIA HÀNG ĐẦU", desc: "Thực hiện bởi Master nhiều năm kinh nghiệm.", icon: "person" },
        { title: "BẢO HÀNH DÀI HẠN", desc: "Chính sách bảo hành rõ ràng, uy tín.", icon: "shield-check" },
      ],
    },
    booking: {
      label: "ĐẶTLỊCH TƯ VẤN",
      title: "Đẹp tự nhiên – Tự tin tỏa sáng",
      desc: "Đặt lịch ngay để được chuyên gia tư vấn miễn phí",
      form: {
        name: "Họ và tên",
        phone: "Số điện thoại",
        date: "Ngày muốn hẹn",
        time: "Giờ (Chọn giờ)",
        service: "Dịch vụ quan tâm (Chọn dịch vụ)",
        note: "Ghi chú",
        submit: "ĐẶT LỊCH NGAY →",
      },
    },
    social: {
      label: "THEO DÕI & LIÊN HỆ",
      title: "Kết nối với chúng tôi",
    },
  },
  footer: {
    tagline: "Sketch of Wings",
    quickLinks: "LIÊN KẾT NHANH",
    services: "DỊCH VỤ",
    training: "ĐÀO TẠO",
    contact: "THÔNG TIN LIÊN HỆ",
    connect: "KẾT NỐI",
    privacy: "Chính sách bảo mật",
    terms: "Điều khoản dịch vụ",
    copyright: "© 2024 PHUOC LAI PERMANENT MAKEUP. All rights reserved.",
    links: [
      { label: "Trang Chủ", href: "/" },
      { label: "Về Chúng Tôi", href: "/ve-chung-toi" },
      { label: "Dịch Vụ", href: "/dich-vu" },
      { label: "Đào Tạo", href: "/dao-tao" },
      { label: "Feedback", href: "/feedback" },
    ],
    serviceLinks: [
      { label: "Điêu Khắc Sợi", href: "/dich-vu" },
      { label: "Phun Mày Ombre", href: "/dich-vu" },
      { label: "Combo Brows", href: "/dich-vu" },
      { label: "Xử Lý Mày Hỏng", href: "/dich-vu" },
    ],
  },
  about: {
    title: "Về Chúng Tôi",
    content: "Hành trình của Master Phuoc Lai...",
  },
  servicesPage: {
    title: "Dịch Vụ",
  },
  trainingPage: {
    title: "Đào Tạo",
  },
  feedbackPage: {
    title: "Feedback",
  },
  contactPage: {
    title: "Liên Hệ",
  },
};

const en: Translations = {
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    training: "Training",
    feedback: "Feedback",
    contact: "Contact",
    bookNow: "BOOKING",
    servicesDropdown: {
      s1: "Hair Stroke",
      s2: "Ombre Brows",
      s3: "Combo Brows",
      s4: "Correction",
    },
    trainingDropdown: {
      t1: "Basic Brows Master",
      t2: "Advanced Brows Expert",
      t3: "Master Advanced",
      t4: "Business Brows & Beyond",
    },
  },
  home: {
    hero: {
      slide1: "",
    },
    intro: {
      label: "AMAZING BROWS",
      title: "Elevating elegance from every single stroke",
      desc: "At Phuoc Lai Luxury, we don't just beautify, we recreate confidence. Bringing international aesthetic standards to Vietnamese women.",
      btn: "READ MORE →",
    },
    services: {
      label: "OUR SERVICES",
      title: "Naturally Beautiful – Perfect in Every Detail",
      btn: "VIEW ALL SERVICES →",
      items: [
        { title: "HAIR STROKE", desc: "Natural hair stroke technique, completely blending with real eyebrows." },
        { title: "OMBRE BROWS", desc: "Micro-touch grain effect brings a sharp, soft beauty." },
        { title: "COMBO BROWS", desc: "Perfect combination of sculpting and ombre shading." },
        { title: "CORRECTION", desc: "Repair, extract solution and reshape to golden ratio." },
      ],
    },
    training: {
      label: "TRAINING PROGRAM",
      title: "Real Learning – Real Practice – Real Success",
      desc: "Professional training program from basic to advanced, helping you master techniques and confidently practice.",
      btn: "VIEW ALL COURSES →",
      courses: [
        { title: "BASIC COURSE", desc: "Master the foundation of permanent makeup", duration: "DURATION: 3 DAYS" },
        { title: "ADVANCED COURSE", desc: "Conquer shading, combo techniques", duration: "DURATION: 7 DAYS" },
        { title: "MASTER CLASS", desc: "Direct practical exam on models", duration: "DURATION: 10 DAYS" },
        { title: "BUSINESS COURSE", desc: "Open a studio, operate a brand", duration: "DURATION: 3 DAYS" },
      ],
    },
    feedback: {
      title: "Words of love are our motivation",
      items: [
        { name: "Thuy Linh", role: "Brow PMU Client", quote: "I can't believe how natural and defined my brows look now. Master Phuoc Lai is truly an artist." },
        { name: "Minh Anh", role: "Lip Blush Client", quote: "The colour after healing is incredibly vivid and natural. No swelling, no pain. Very professional." },
        { name: "Hoang Yen", role: "Correction Client", quote: "Had a bad experience elsewhere, but they fixed my brow shape perfectly here. Highly recommended!" },
        { name: "Ngoc Bich", role: "Brows Master Student", quote: "Very practical and detailed course. Confidently opened my own studio after graduating." },
      ],
    },
    whyChoose: {
      title: "WHY CHOOSE AMAZING BROWS?",
      items: [
        { title: "EXCLUSIVE TECHNIQUE", desc: "Using the latest hair stroke sculpting technology.", icon: "diamond" },
        { title: "ORGANIC PIGMENTS", desc: "100% skin-safe organic pigments.", icon: "leaf" },
        { title: "ABSOLUTE SAFETY", desc: "Medical-standard procedure, painless experience.", icon: "shield" },
        { title: "TOP EXPERTS", desc: "Performed by Masters with years of experience.", icon: "person" },
        { title: "LONG-TERM WARRANTY", desc: "Clear and reliable warranty policy.", icon: "shield-check" },
      ],
    },
    booking: {
      label: "BOOK CONSULTATION",
      title: "Naturally Beautiful – Confidently Shining",
      desc: "Book now for a free consultation with an expert",
      form: {
        name: "Full Name",
        phone: "Phone Number",
        date: "Preferred Date",
        time: "Time (Select)",
        service: "Service of Interest (Select)",
        note: "Notes",
        submit: "BOOK NOW →",
      },
    },
    social: {
      label: "FOLLOW & CONTACT",
      title: "Connect with us",
    },
  },
  footer: {
    tagline: "Sketch of Wings",
    quickLinks: "QUICK LINKS",
    services: "SERVICES",
    training: "TRAINING",
    contact: "CONTACT INFO",
    connect: "CONNECT",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "© 2024 PHUOC LAI PERMANENT MAKEUP. All rights reserved.",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/ve-chung-toi" },
      { label: "Services", href: "/dich-vu" },
      { label: "Training", href: "/dao-tao" },
      { label: "Feedback", href: "/feedback" },
    ],
    serviceLinks: [
      { label: "Hair Stroke", href: "/dich-vu" },
      { label: "Ombre Brows", href: "/dich-vu" },
      { label: "Combo Brows", href: "/dich-vu" },
      { label: "Correction", href: "/dich-vu" },
    ],
  },
  about: {
    title: "About Us",
    content: "The journey of Master Phuoc Lai...",
  },
  servicesPage: {
    title: "Services",
  },
  trainingPage: {
    title: "Training",
  },
  feedbackPage: {
    title: "Feedback",
  },
  contactPage: {
    title: "Contact",
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
