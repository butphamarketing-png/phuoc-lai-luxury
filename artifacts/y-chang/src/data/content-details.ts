export interface ContentSection {
  heading: string;
  content?: string;
  image?: string;
  list?: string[];
}

/** SEO metadata (giống tab SEO trong CMS tham chiếu) */
export interface DetailSeo {
  title?: string;
  keywords?: string;
  description?: string;
}

export interface ServiceDetailContent {
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  intro: string;
  /** Mô tả ngắn (meta / excerpt) */
  metaDescription?: string;
  /** Nội dung HTML từ trình soạn thảo */
  bodyHtml?: string;
  seo?: DetailSeo;
  sections: ContentSection[];
}

export interface TrainingDetailContent {
  title: string;
  level: string;
  image: string;
  date: string;
  instructor: string;
  duration: string;
  intro: string;
  metaDescription?: string;
  bodyHtml?: string;
  seo?: DetailSeo;
  curriculum: string[];
  sections: ContentSection[];
}

export const SERVICE_DETAIL_DATA: Record<string, ServiceDetailContent> = {
  "amazing-brows-fiber": {
    title: "Điêu Khắc Sợi AMAZINGBROWS: Đỉnh Cao Công Nghệ PMU",
    category: "Phun Xăm Thẩm Mỹ",
    image: "/service-brows.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Master",
    readTime: "8 phút đọc",
    intro: "Kỹ thuật điêu khắc sợi AMAZINGBROWS độc quyền tại Phuoc Lai Luxury không chỉ là một dịch vụ làm đẹp, mà là một tác phẩm nghệ thuật kiến tạo đôi chân mày siêu thực, hài hòa tuyệt đối với tỉ lệ vàng của gương mặt.",
    sections: [
      {
        heading: "Công nghệ AMAZINGBROWS là gì?",
        content: "Đây là kỹ thuật tạo sợi bằng máy kỹ thuật số tiên tiến nhất hiện nay. Sử dụng đầu kim nano siêu mảnh (0.12mm), chúng tôi đưa mực vào tầng thượng bì của da một cách nhẹ nhàng nhất có thể. Khác với phương pháp Microblading truyền thống dùng dao khắc dễ gây sẹo, AMAZINGBROWS hoàn toàn không gây tổn thương mô, giúp giữ sợi bền đẹp theo thời gian.",
      },
      {
        heading: "Ưu điểm vượt trội của AMAZINGBROWS",
        content: "Tại sao hàng ngàn khách hàng lại tin tưởng và lựa chọn kỹ thuật này tại Phuoc Lai Luxury? Dưới đây là những lý do cốt lõi:",
        list: [
          "Sợi mày siêu thực: Mô phỏng chính xác độ cong, độ mảnh và hướng mọc của lông mày thật.",
          "Không đau, không sưng: Kỹ thuật đi kim nhẹ nhàng như lướt trên da, khách hàng có thể đi tiệc ngay sau khi làm.",
          "Mực hữu cơ cao cấp: Sử dụng mực Organic nhập khẩu 100% từ Đức và Mỹ, cam kết không trổ xanh, trổ đỏ.",
          "Phù hợp với mọi loại da: Đặc biệt hiệu quả trên cả da dầu và lỗ chân lông to - điều mà các kỹ thuật cũ thường thất bại.",
          "Dáng mày phong thủy: Thiết kế riêng biệt cho từng gương mặt, giúp tôn vinh thần thái và thu hút tài lộc."
        ]
      },
      {
        heading: "Quy trình thực hiện chuyên nghiệp",
        content: "Mỗi ca AMAZINGBROWS tại Studio đều trải qua quy trình nghiêm ngặt kéo dài từ 120-150 phút:",
        list: [
          "Bước 1: Thăm khám và tư vấn dáng mày phù hợp với cấu trúc xương mặt.",
          "Bước 2: Phác thảo dáng mày bằng thước đo tỉ lệ vàng chuyên dụng.",
          "Bước 3: Ủ tê bằng sản phẩm cao cấp giúp khách hàng hoàn toàn thoải mái.",
          "Bước 4: Tiến hành đi sợi nghệ thuật bằng máy nano.",
          "Bước 5: Kiểm tra độ bám màu và dặn dò chăm sóc hậu phẫu."
        ]
      }
    ],
  },
  "sandbrows": {
    title: "Phun Mày SANDBROWS: Hiệu Ứng Rải Hạt Mịn Như Cát",
    category: "Phun Xăm Thẩm Mỹ",
    image: "/service-ombre.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Expert",
    readTime: "6 phút đọc",
    intro: "Phun mày SANDBROWS mang đến vẻ đẹp thanh thoát, hiện đại với hiệu ứng chuyển màu tinh tế, giúp đôi chân mày trông như được trang điểm nhẹ nhàng bởi một lớp bột mịn cao cấp.",
    sections: [
      {
        heading: "Hiệu ứng rải hạt SandBrows là gì?",
        content: "Kỹ thuật này sử dụng máy phun kỹ thuật số tạo ra hàng triệu hạt mực li ti xếp chồng lớp lên nhau. Điểm đặc biệt của SandBrows là sự chuyển sắc (Ombre) cực kỳ tự nhiên: nhạt ở phần đầu và đậm dần, sắc nét về phía đuôi mày.",
      },
      {
        heading: "Sự khác biệt của SandBrows",
        content: "Khác với các phương pháp phun thêu cũ thường tạo cảm giác cứng nhắc và đóng khung, SandBrows ưu tiên sự mềm mại và trong trẻo của màu sắc.",
        list: [
          "Màu sắc đa dạng: Từ nâu tây, nâu đen đến xám khói, phù hợp với màu tóc và màu da của người Á Đông.",
          "Độ bền cực cao: Màu sắc giữ được từ 2-3 năm mà vẫn giữ được độ tươi tắn.",
          "Xử lý khuyết điểm: Che phủ hoàn hảo các vùng lông mày thưa, không đều màu hoặc nền cũ bị lỗi nhẹ."
        ]
      }
    ],
  },
  "sexylips": {
    title: "Phun Môi SEXYLIPS: Đôi Môi Căng Mọng, Quyến Rũ Không Cần Trang Điểm",
    category: "Phun Xăm Thẩm Mỹ",
    image: "/service-lips.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Master",
    readTime: "7 phút đọc",
    intro: "Dịch vụ phun môi SEXYLIPS tại Phuoc Lai Luxury giúp bạn sở hữu đôi môi hồng hào, căng mọng và tràn đầy sức sống chỉ sau một liệu trình duy nhất.",
    sections: [
      {
        heading: "Tạm biệt môi thâm, xỉn màu",
        content: "Với công thức khử thâm chuyên sâu kết hợp với mực collagen, SEXYLIPS không chỉ thay đổi màu môi mà còn nuôi dưỡng làn môi từ sâu bên trong. Chúng tôi giải quyết triệt để tình trạng môi thâm do cơ địa hoặc sử dụng son chứa chì lâu ngày.",
      },
      {
        heading: "Tại sao SEXYLIPS lại được yêu thích?",
        content: "Bí quyết nằm ở kỹ thuật đi kim siêu vi chạm và sự kết hợp của tế bào gốc:",
        list: [
          "Màu sắc trong trẻo: Lên màu đúng tone, bóng mịn và tự nhiên như môi thật.",
          "Kỹ thuật không sưng: Sử dụng tê cao cấp và máy phun hiện đại giúp giảm thiểu tối đa cảm giác khó chịu.",
          "Dáng môi gợi cảm: Chỉnh sửa viền môi lệch, giúp đôi môi trở nên cân đối và quyến rũ hơn.",
          "Phục hồi siêu tốc: Môi bong vảy sau 2-3 ngày và ổn định màu sắc chỉ sau 1 tháng."
        ]
      }
    ],
  },
  "phoenix-eyeliner": {
    title: "Phun Mí Phượng Hoàng: Điểm Nhấn Sắc Sảo Cho Đôi Mắt Hút Hồn",
    category: "Phun Xăm Thẩm Mỹ",
    image: "/hero-portrait.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Expert",
    readTime: "5 phút đọc",
    intro: "Đôi mắt là cửa sổ tâm hồn, và Phun mí phượng hoàng là 'chiếc khung' hoàn hảo để tôn vinh vẻ đẹp sâu thẳm, cuốn hút của đôi mắt bạn.",
    sections: [
      {
        heading: "Nghệ thuật kiến tạo đường viền mắt",
        content: "Kỹ thuật này tạo ra một đường eyeliner siêu mảnh, ôm sát chân mi, giúp đôi mắt trông to tròn, long lanh và có chiều sâu hơn mà không cần tốn thời gian trang điểm mỗi ngày.",
      },
      {
        heading: "Ưu điểm của Phun mí Phượng Hoàng",
        list: [
          "Khắc phục nhược điểm: Mắt nhỏ, mắt một mí hoặc sụp mí nhẹ sẽ được cải thiện đáng kể về mặt thị giác.",
          "Mực đen mướt tự nhiên: Sử dụng mực đen tuyền cao cấp không bị trổ xanh theo thời gian.",
          "Không ảnh hưởng thị lực: Kỹ thuật chỉ tác động lên lớp biểu bì ngoài cùng của da mí mắt, hoàn toàn an toàn cho mắt."
        ]
      }
    ],
  },
  "spa-basic": {
    title: "Chăm Sóc Da Chuyên Sâu: Hồi Sinh Làn Da Tươi Trẻ",
    category: "Spa & Trị Liệu",
    image: "/studio-interior.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Skin Expert",
    readTime: "7 phút đọc",
    intro: "Liệu trình chăm sóc da chuyên sâu tại Phuoc Lai Luxury được thiết kế riêng biệt cho từng loại da, giúp loại bỏ độc tố, cung cấp dưỡng chất và mang lại làn da sáng mịn, khỏe khoắn từ bên trong.",
    sections: [
      {
        heading: "Tầm quan trọng của việc chăm sóc da chuyên sâu",
        content: "Môi trường ô nhiễm và áp lực cuộc sống khiến làn da dễ bị tổn thương, xỉn màu và lão hóa sớm. Chăm sóc da chuyên sâu không chỉ là làm sạch bề mặt mà còn là quá trình phục hồi và tái tạo các tế bào da ở tầng sâu.",
      },
      {
        heading: "Quy trình liệu trình 12 bước chuẩn Y khoa",
        content: "Chúng tôi áp dụng quy trình nghiêm ngặt để đảm bảo hiệu quả tối ưu:",
        list: [
          "Tẩy trang và làm sạch sâu bằng sản phẩm dược mỹ phẩm cao cấp.",
          "Tẩy tế bào chết vật lý và hóa học nhẹ nhàng.",
          "Xông hơi thảo dược giúp giãn nở lỗ chân lông.",
          "Hút mụn cám và bã nhờn bằng công nghệ chân không.",
          "Sát khuẩn da và lấy nhân mụn chuẩn y khoa (nếu có).",
          "Massage mặt thư giãn, kích thích lưu thông tuần hoàn máu.",
          "Điện di tinh chất vitamin C/HA giúp da trắng sáng, căng bóng.",
          "Đắp mặt nạ phục hồi chuyên sâu phù hợp với tình trạng da.",
          "Chiếu ánh sáng sinh học Biolight tăng sinh collagen.",
          "Thoa kem dưỡng khóa ẩm và bảo vệ da.",
          "Thoa kem chống nắng phổ rộng.",
          "Massage đầu, cổ, vai gáy thư giãn kết thúc liệu trình."
        ]
      }
    ],
  },
  "spa-advanced": {
    title: "Liệu Trình Công Nghệ Cao: Đỉnh Cao Trẻ Hóa & Điều Trị",
    category: "Spa & Trị Liệu",
    image: "/studio.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Director",
    readTime: "10 phút đọc",
    intro: "Ứng dụng các công nghệ thẩm mỹ tiên tiến nhất thế giới, chúng tôi mang đến giải pháp điều trị triệt để các vấn đề về sắc tố, nếp nhăn và lỗ chân lông, trả lại vẻ đẹp thanh xuân không tì vết.",
    sections: [
      {
        heading: "Công nghệ đột phá tại Phuoc Lai Luxury",
        content: "Chúng tôi đầu tư hệ thống máy móc hiện đại được FDA chứng nhận về an toàn và hiệu quả, giúp giải quyết các khuyết điểm trên da một cách nhanh chóng và bền vững.",
      },
      {
        heading: "Các giải pháp điều trị tiêu biểu",
        list: [
          "Trị nám, tàn nhang Laser Picosure: Đánh bay các sắc tố đen sâu dưới da mà không gây bỏng rát hay để lại sẹo.",
          "Nâng cơ trẻ hóa Hifu Therapy: Kích thích tăng sinh collagen và elastin tự nhiên, giúp da săn chắc, xóa mờ nếp nhăn và thon gọn gương mặt.",
          "Se khít lỗ chân lông CO2 Fractional: Tái tạo bề mặt da, xử lý sẹo rỗ và thu nhỏ lỗ chân lông hiệu quả đến 90%.",
          "Căng bóng da Meso Therapy: Đưa dưỡng chất trực tiếp vào lớp trung bì, giúp da căng mướt, ngậm nước ngay tức thì."
        ]
      },
      {
        heading: "Cam kết chất lượng",
        content: "Mọi liệu trình công nghệ cao đều được thực hiện bởi đội ngũ kỹ thuật viên giàu kinh nghiệm, dưới sự giám sát chặt chẽ của chuyên gia da liễu.",
      }
    ],
  },
  "spa-acne-treatment": {
    title: "Trị Mụn Chuyên Sâu: Giải Pháp Dứt Điểm & Phục Hồi Da",
    category: "Spa & Trị Liệu",
    image: "/studio-interior.png",
    date: "19 Tháng 5, 2026",
    author: "Phuoc Lai Skin Expert",
    readTime: "8 phút đọc",
    intro: "Phác đồ điều trị mụn cá nhân hóa tại Phuoc Lai Luxury giúp loại bỏ tận gốc các loại mụn cứng đầu, đồng thời phục hồi nền da tổn thương, ngăn ngừa sẹo và thâm mụn hiệu quả.",
    sections: [
      {
        heading: "Tại sao nên điều trị mụn tại Phuoc Lai Luxury?",
        content: "Chúng tôi không chỉ lấy nhân mụn mà còn tập trung vào việc điều tiết tuyến bã nhờn và tiêu diệt vi khuẩn P.acnes gây mụn.",
        list: [
          "Kỹ thuật lấy nhân mụn chuẩn y khoa: Không sưng, không đau, không để lại sẹo lõm.",
          "Công nghệ ánh sáng đa tầng: Tiêu viêm cực nhanh, làm dịu da tức thì.",
          "Sử dụng dược mỹ phẩm đặc trị: Các sản phẩm nhập khẩu giúp gom cồi mụn nhanh chóng."
        ]
      },
      {
        heading: "Quy trình trị mụn chuyên sâu",
        list: [
          "Bước 1: Thăm khám và soi da để xác định cấp độ mụn.",
          "Bước 2: Vệ sinh da và xông hơi mở lỗ chân lông.",
          "Bước 3: Hút sạch dầu thừa và mụn cám.",
          "Bước 4: Sát khuẩn và tiến hành lấy nhân mụn bằng dụng cụ riêng biệt.",
          "Bước 5: Đi điện tím diệt khuẩn.",
          "Bước 6: Đắp mặt nạ giảm sưng, kiềm dầu.",
          "Bước 7: Chiếu ánh sáng xanh Blue Light tiêu diệt vi khuẩn."
        ]
      }
    ],
  },
  "spa-skin-rejuvenation": {
    title: "Trẻ Hóa Exosome: Công Nghệ Tái Tạo Da Tế Bào Gốc",
    category: "Spa & Trị Liệu",
    image: "/studio.png",
    date: "19 Tháng 5, 2026",
    author: "Phuoc Lai Director",
    readTime: "9 phút đọc",
    intro: "Exosome là bước đột phá trong y học tái tạo, giúp truyền tải hàng tỷ tín hiệu tăng trưởng trực tiếp vào tế bào da, mang lại hiệu quả trẻ hóa gấp nhiều lần so với các phương pháp thông thường.",
    sections: [
      {
        heading: "Sức mạnh của Exosome",
        content: "Exosome không phải là tế bào, mà là các túi ngoại bào chứa các yếu tố tăng trưởng, protein và vật chất di truyền giúp 'đánh thức' khả năng tự phục hồi của làn da.",
        list: [
          "Cấp ẩm sâu: Giúp da căng mọng, ngậm nước ngay sau liệu trình.",
          "Xóa mờ nếp nhăn: Kích thích tăng sinh Collagen và Elastin tự nhiên.",
          "Làm sáng da: Cải thiện tình trạng da xỉn màu, thiếu sức sống.",
          "Thu nhỏ lỗ chân lông: Tái cấu trúc bề mặt da mịn màng."
        ]
      },
      {
        heading: "Đối tượng phù hợp",
        content: "Liệu trình này đặc biệt hiệu quả cho làn da bắt đầu xuất hiện dấu hiệu lão hóa, da mỏng yếu do sử dụng kem trộn hoặc da sau điều trị xâm lấn cần phục hồi nhanh.",
      }
    ],
  },
};

export const TRAINING_DETAIL_DATA: Record<string, TrainingDetailContent> = {
  "amazing-brows": {
    title: "Khóa Học Sợi AMAZINGBROWS Nâng Cao",
    level: "Master Course",
    image: "/training-1.png",
    date: "20 Tháng 5, 2026",
    instructor: "Master Phuoc Lai",
    duration: "5 Ngày Thực Chiến",
    intro: "Khóa học dành riêng cho các thợ PMU đã có tay nghề, muốn bứt phá thu nhập và khẳng định đẳng cấp với kỹ thuật tạo sợi siêu thực AMAZINGBROWS - xu hướng hàng đầu thế giới hiện nay.",
    curriculum: [
      "Lý thuyết chuyên sâu về cấu trúc da và tầng da trong đi sợi máy.",
      "Kỹ thuật tạo sợi nano siêu mảnh bằng máy kỹ thuật số.",
      "Cách sắp xếp sợi (Pattern) tự nhiên, phù hợp với từng dáng mày.",
      "Bí quyết giữ sợi 95% sau khi bong.",
      "Xử lý các nền chân mày cũ, trổ màu bằng kỹ thuật đi sợi.",
      "Kỹ năng chụp ảnh, quay video sản phẩm và xây dựng thương hiệu cá nhân."
    ],
    sections: [
      {
        heading: "Tại sao nên học AMAZINGBROWS?",
        content: "Trong thị trường PMU đang bão hòa, AMAZINGBROWS là chìa khóa giúp bạn trở nên khác biệt. Kỹ thuật này không chỉ đòi hỏi sự khéo léo mà còn cần tư duy thẩm mỹ hiện đại.",
        list: [
          "Tiết kiệm thời gian: Làm chủ kỹ thuật đi sợi nhanh, chuẩn xác.",
          "Nâng cao thu nhập: Dịch vụ sợi máy luôn có mức giá cao hơn các dịch vụ thông thường.",
          "Cam kết tay nghề: Học viên được thực hành trực tiếp trên người thật dưới sự giám sát của Master."
        ]
      },
      {
        heading: "Quyền lợi của học viên",
        content: "Phuoc Lai Academy cam kết mang đến môi trường học tập chuyên nghiệp nhất:",
        list: [
          "Tặng bộ dụng cụ máy nano cao cấp.",
          "Cấp chứng chỉ Master có giá trị toàn quốc.",
          "Hỗ trợ chuyên môn trọn đời sau khóa học.",
          "Tư vấn setup studio và chiến lược tìm kiếm khách hàng."
        ]
      }
    ],
  },
  "lip-master": {
    title: "Khóa Học Môi SEXYLIPS Chuyên Sâu",
    level: "Expert Course",
    image: "/training-2.png",
    date: "22 Tháng 5, 2026",
    instructor: "Master Phuoc Lai",
    duration: "4 Ngày Thực Chiến",
    intro: "Làm chủ kỹ thuật phun môi không sưng, bám màu nhanh và công thức pha màu độc quyền giúp môi trong trẻo, căng mọng ngay sau khi bong.",
    curriculum: [
      "Kỹ thuật đi kim vi chạm không sưng, không đau.",
      "Cách sử dụng tê an toàn và hiệu quả.",
      "Công thức khử thâm chuyên sâu cho mọi cấp độ môi.",
      "Cách phối màu môi theo tone da và sở thích khách hàng.",
      "Kỹ thuật cấy tế bào gốc phục hồi môi tổn thương."
    ],
    sections: [
      {
        heading: "Bí quyết tạo nên đôi môi Sexy",
        content: "Học viên sẽ được học cách kiểm soát lực tay và tốc độ máy để mực ghim vào da đều, mịn và không bị bết màu.",
      }
    ],
  },
  "master-advanced": {
    title: "Khóa Học PMU TỔNG HỢP (All-in-one)",
    level: "Grand Master Course",
    image: "/training-3.png",
    date: "25 Tháng 5, 2026",
    instructor: "Grand Master Phuoc Lai",
    duration: "15 Ngày Toàn Diện",
    intro: "Khóa học toàn diện nhất dành cho người mới bắt đầu hoặc thợ muốn học lại bài bản từ đầu tất cả các kỹ thuật: Mày, Môi, Mí.",
    curriculum: [
      "Học trọn bộ kỹ thuật: AMAZINGBROWS, SANDBROWS, SEXYLIPS.",
      "Kỹ thuật Phun mí Phượng Hoàng sắc nét.",
      "Kiến thức về nhân tướng học và thiết kế dáng mày phong thủy.",
      "Kỹ năng tư vấn và chốt sale chuyên nghiệp.",
      "Cách quản lý và vận hành Studio tối ưu chi phí."
    ],
    sections: [
      {
        heading: "Lộ trình đào tạo bài bản",
        content: "Từ lý thuyết nền tảng đến thực hành trên da giả và cuối cùng là thực chiến trên người thật, chúng tôi đồng hành cùng bạn cho đến khi thành thạo.",
      }
    ],
  },
  "spa-expert": {
    title: "Khóa Đào Tạo Spa & Skincare Chuyên Nghiệp",
    level: "Professional Course",
    image: "/studio-interior.png",
    date: "28 Tháng 5, 2026",
    instructor: "Skin Master Nhung Lai",
    duration: "10 Ngày Chuyên Sâu",
    intro: "Trở thành chuyên viên chăm sóc da chuyên nghiệp với kiến thức vững chắc về cấu trúc da, hoạt chất mỹ phẩm và kỹ thuật vận hành máy móc công nghệ cao.",
    curriculum: [
      "Kiến thức nền tảng về giải phẫu da và các loại da.",
      "Kỹ thuật massage mặt chuẩn Thụy Điển và bấm huyệt thư giãn.",
      "Phác đồ điều trị mụn, nám, tàn nhang chuẩn Y khoa.",
      "Cách sử dụng máy Hifu, Laser, CO2 Fractional trong điều trị.",
      "Kiến thức về các thành phần mỹ phẩm (AHA, BHA, Retinol, Vitamin C...).",
      "Kỹ năng tư vấn và xây dựng liệu trình cá nhân hóa cho khách hàng."
    ],
    sections: [
      {
        heading: "Cơ hội nghề nghiệp rộng mở",
        content: "Ngành Spa đang khát nhân lực chất lượng cao. Sau khóa học, bạn hoàn toàn tự tin để làm việc tại các Clinic lớn hoặc tự mở cơ sở kinh doanh riêng.",
        list: [
          "Bằng cấp uy tín: Chứng chỉ nghề có giá trị pháp lý.",
          "Thực hành 80%: Được trực tiếp thực hiện trên mẫu thật.",
          "Hỗ trợ nhập mỹ phẩm: Kết nối với các nguồn dược mỹ phẩm chính hãng giá tốt."
        ]
      }
    ],
  },
  "spa-basic": {
    title: "Khóa Học Chăm Sóc Da Cơ Bản",
    level: "Basic Course",
    image: "/studio-interior.png",
    date: "26 Tháng 5, 2026",
    instructor: "Nhung Lai Master",
    duration: "7 Ngày Học",
    intro: "Nắm vững những kiến thức cốt lõi nhất về làn da và các bước chăm sóc da chuẩn salon để bắt đầu sự nghiệp trong ngành làm đẹp.",
    curriculum: [
      "Tổng quan về ngành Spa và đạo đức nghề nghiệp.",
      "Phân loại da và cách lựa chọn mỹ phẩm phù hợp.",
      "Kỹ thuật tẩy trang, rửa mặt và tẩy tế bào chết chuyên nghiệp.",
      "Kỹ thuật xông hơi và hút dầu thừa.",
      "Massage mặt cơ bản giúp thư giãn và lưu thông máu.",
      "Quy trình đắp mặt nạ và thoa kem dưỡng."
    ],
    sections: [
      {
        heading: "Khởi đầu vững chắc",
        content: "Khóa học này được thiết kế dành cho người mới bắt đầu, giúp bạn có cái nhìn tổng quan và tay nghề cơ bản để làm việc tại các Spa.",
      }
    ],
  },
  "spa-advanced": {
    title: "Khóa Học Spa Nâng Cao & Trị Liệu",
    level: "Advanced Course",
    image: "/studio.png",
    date: "27 Tháng 5, 2026",
    instructor: "Nhung Lai Master",
    duration: "10 Ngày Học",
    intro: "Nâng cao tay nghề với các kỹ thuật trị liệu da liễu và ứng dụng công nghệ cao trong làm đẹp.",
    curriculum: [
      "Kỹ thuật lấy nhân mụn chuẩn y khoa không để lại sẹo.",
      "Peel da sinh học và phục hồi da sau peel.",
      "Ứng dụng công nghệ Laser trong điều trị sắc tố.",
      "Kỹ thuật Hifu nâng cơ và trẻ hóa da.",
      "Lăn kim và phi kim trong điều trị sẹo rỗ, lỗ chân lông to.",
      "Cách xử lý các biến chứng thường gặp trong Spa."
    ],
    sections: [
      {
        heading: "Làm chủ công nghệ",
        content: "Học viên sẽ được thực hành trên các dòng máy hiện đại nhất hiện nay, giúp nâng tầm giá trị dịch vụ của bản thân.",
      }
    ],
  },
  "spa-therapy": {
    title: "Khóa Học Trị Liệu Da Chuyên Sâu (Therapy)",
    level: "Expert Course",
    image: "/studio.png",
    date: "29 Tháng 5, 2026",
    instructor: "Nhung Lai Master",
    duration: "5 Ngày Thực Chiến",
    intro: "Chương trình đào tạo chuyên biệt về các liệu pháp trị liệu xâm lấn tối thiểu và phục hồi cấu trúc da hư tổn.",
    curriculum: [
      "Kỹ thuật Mesotherapy (cấy tinh chất) không sưng, không bầm.",
      "Phác đồ phục hồi da nhiễm corticoid, da mỏng yếu.",
      "Kết hợp hoạt chất (Mix & Match) trong điều trị da liễu.",
      "Kỹ thuật xử lý thâm, nám tầng sâu bằng công nghệ ánh sáng.",
      "Tư vấn phác đồ chăm sóc da tại nhà (Homecare) hiệu quả."
    ],
    sections: [
      {
        heading: "Đẳng cấp chuyên gia",
        content: "Khóa học giúp bạn giải quyết những ca da khó nhất, khẳng định vị thế chuyên gia trong lòng khách hàng.",
      }
    ],
  },
};
