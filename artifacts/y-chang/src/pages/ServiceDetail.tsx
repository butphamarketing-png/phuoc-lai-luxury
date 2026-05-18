import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Clock, User, Calendar, Share2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceContent {
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
    image?: string;
  }[];
}

const serviceData: Record<string, ServiceContent> = {
  "amazing-brows-fiber": {
    title: "Điêu Khắc Sợi AMAZINGBROWS: Đỉnh Cao Công Nghệ PMU",
    category: "Phun Xăm",
    image: "/service-brows.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Master",
    readTime: "6 phút đọc",
    intro: "Kỹ thuật điêu khắc sợi AMAZINGBROWS độc quyền tại Phuoc Lai Luxury mang đến đôi chân mày siêu thực, hài hòa tuyệt đối với gương mặt.",
    sections: [
      {
        heading: "Công nghệ AMAZINGBROWS là gì?",
        content: "Đây là kỹ thuật tạo sợi bằng máy kỹ thuật số với đầu kim nano siêu mảnh, giúp tạo ra những đường nét mềm mại, đan xen tự nhiên như sợi lông mày thật mà không gây tổn thương da.",
      },
      {
        heading: "Tại sao nên chọn AMAZINGBROWS?",
        content: "Khác với điêu khắc truyền thống, AMAZINGBROWS giữ màu cực tốt, không bị trổ màu theo thời gian và phù hợp với mọi loại da, kể cả da dầu.",
      },
    ],
  },
  "sandbrows": {
    title: "Phun Mày SANDBROWS: Hiệu Ứng Rải Hạt Mịn Như Cát",
    category: "Phun Xăm",
    image: "/service-ombre.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Expert",
    readTime: "5 phút đọc",
    intro: "Phun mày SANDBROWS tạo ra lớp nền chân mày mịn màng, mỏng nhẹ như những hạt cát, mang lại vẻ đẹp thanh thoát và hiện đại.",
    sections: [
      {
        heading: "Hiệu ứng rải hạt SandBrows",
        content: "Kỹ thuật rải hạt đa tầng giúp chân mày có độ sâu và chuyển màu từ nhạt sang đậm một cách tự nhiên nhất, không bị bết dính hay đóng khung cứng nhắc.",
      },
    ],
  },
  "sexylips": {
    title: "Phun Môi SEXYLIPS: Đôi Môi Căng Mọng, Quyến Rũ",
    category: "Phun Xăm",
    image: "/service-lips.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Master",
    readTime: "5 phút đọc",
    intro: "Kỹ thuật SEXYLIPS giúp cải thiện tình trạng môi thâm, xỉn màu, mang lại sắc môi tươi tắn, căng bóng và đầy sức sống.",
    sections: [
      {
        heading: "Ưu điểm của công nghệ SEXYLIPS",
        content: "Sử dụng mực hữu cơ cao cấp kết hợp với tế bào gốc giúp môi phục hồi nhanh, màu sắc trong trẻo và không cần thời gian nghỉ dưỡng.",
      },
    ],
  },
  "phoenix-eyeliner": {
    title: "Phun Mí Phượng Hoàng: Điểm Nhấn Sắc Sảo Cho Đôi Mắt",
    category: "Phun Xăm",
    image: "/hero-portrait.png",
    date: "18 Tháng 5, 2026",
    author: "Phuoc Lai Expert",
    readTime: "4 phút đọc",
    intro: "Phun mí phượng hoàng là kỹ thuật thiết kế đường viền mí mắt giúp đôi mắt trông to tròn, có chiều sâu và hút hồn hơn.",
    sections: [
      {
        heading: "Nghệ thuật kiến tạo đôi mắt phượng",
        content: "Đường eyeliner được đi siêu mảnh, sắc nét và ôm sát chân mi, tạo hiệu ứng đôi mắt dài và quyến rũ như mắt phượng.",
      },
    ],
  },
  "dieu-khac-hairstroke": {
    title: "Điêu Khắc Chân Mày Hairstroke: Đỉnh Cao Của Sự Siêu Thực",
    category: "Điêu khắc chân mày",
    image: "/service-brows.png",
    date: "15 Tháng 5, 2026",
    author: "Phuoc Lai Master",
    readTime: "5 phút đọc",
    intro: "Kỹ thuật Hairstroke không chỉ là một dịch vụ thẩm mỹ, mà là một nghệ thuật kiến tạo những sợi lông mày siêu thực, mô phỏng chính xác chiều mọc và độ mềm mại của sợi lông mày thật.",
    sections: [
      {
        heading: "Hairstroke là gì?",
        content: "Khác với các phương pháp cũ, Hairstroke sử dụng máy kỹ thuật số với đầu kim siêu mảnh để đi những sợi dài, mảnh và mềm mại. Kỹ thuật này cho phép tạo ra các sợi đan xen, chồng lớp tự nhiên như lông mày nguyên bản của khách hàng.",
      },
      {
        heading: "Ưu điểm vượt trội",
        content: "Điểm mạnh nhất của Hairstroke chính là độ bền màu và không gây tổn thương sâu cho da. Màu mực được đưa vào tầng thượng bì một cách nhẹ nhàng, giúp sợi giữ được độ sắc nét sau khi bong mà không bị trổ xanh hay trổ đỏ.",
      },
      {
        heading: "Quy trình thực hiện tại Phuoc Lai",
        content: "Mỗi khách hàng sẽ được thiết kế dáng mày phong thủy, phù hợp với tỉ lệ gương mặt. Chúng tôi sử dụng mực hữu cơ cao cấp nhập khẩu trực tiếp từ Châu Âu để đảm bảo an toàn tuyệt đối.",
      },
    ],
  },
  "phun-may-ombre": {
    title: "Phun Chân Mày Ombre: Hiệu Ứng Rải Hạt Mịn Màng",
    category: "Phun mày",
    image: "/service-ombre.png",
    date: "14 Tháng 5, 2026",
    author: "Phuoc Lai Expert",
    readTime: "4 phút đọc",
    intro: "Phun mày Ombre mang đến vẻ đẹp hiện đại với hiệu ứng chuyển màu tinh tế, giúp đôi chân mày trông như được trang điểm nhẹ nhàng bằng bột mịn.",
    sections: [
      {
        heading: "Kỹ thuật Ombre hiện đại",
        content: "Kỹ thuật này tạo ra độ đậm nhạt khác nhau: nhạt ở phần đầu và đậm dần về phía đuôi mày. Điều này tạo ra chiều sâu và sự thanh thoát cho gương mặt.",
      },
      {
        heading: "Phù hợp với ai?",
        content: "Ombre là lựa chọn hoàn hảo cho những khách hàng yêu thích phong cách trẻ trung, năng động hoặc những người có làn da dầu, khó giữ sợi điêu khắc.",
      },
    ],
  },
  "combo-brows": {
    title: "Combo Brows: Sự Kết Hợp Hoàn Hảo Giữa Sợi Và Hạt",
    category: "Dịch vụ kết hợp",
    image: "/service-combo.png",
    date: "12 Tháng 5, 2026",
    author: "Phuoc Lai Master",
    readTime: "6 phút đọc",
    intro: "Combo Brows là giải pháp tối ưu cho những ai muốn có độ tự nhiên của sợi ở đầu mày và độ sắc nét, bền màu của phun hạt ở đuôi mày.",
    sections: [
      {
        heading: "Tại sao chọn Combo Brows?",
        content: "Nếu bạn có ít lông mày tự nhiên hoặc muốn một đôi mày bền đẹp trong thời gian dài mà vẫn giữ được nét thanh mảnh, Combo Brows chính là câu trả lời.",
      },
    ],
  },
  "xu-ly-may-hong": {
    title: "Xử Lý Mày Hỏng: Hồi Sinh Vẻ Đẹp Nguyên Bản",
    category: "Điều trị & Phục hồi",
    image: "/service-correction.png",
    date: "10 Tháng 5, 2026",
    author: "Phuoc Lai Expert",
    readTime: "7 phút đọc",
    intro: "Xử lý chân mày lỗi hỏng, trổ màu hoặc dáng cũ không phù hợp là một trong những thế mạnh đặc biệt tại Phuoc Lai Luxury.",
    sections: [
      {
        heading: "Lộ trình xử lý khoa học",
        content: "Chúng tôi áp dụng các phương pháp hút màu dung dịch hoặc laser tiên tiến nhất để loại bỏ sắc tố cũ mà không để lại sẹo, trả lại nền da sạch để thiết kế dáng mày mới.",
      },
    ],
  },
  "phun-moi-vi-cham": {
    title: "Phun Môi Vi Chạm: Đôi Môi Căng Mọng Tự Nhiên",
    category: "Phun môi",
    image: "/service-lips.png",
    date: "08 Tháng 5, 2026",
    author: "Phuoc Lai Expert",
    readTime: "5 phút đọc",
    intro: "Tạm biệt đôi môi thâm sạm và thiếu sức sống. Kỹ thuật phun môi vi chạm giúp bạn sở hữu làn môi hồng hào, căng bóng mọi lúc mọi nơi.",
    sections: [
      {
        heading: "Công nghệ không sưng đau",
        content: "Với kỹ thuật đi kim nhẹ nhàng và tê chuyên dụng, khách hàng hoàn toàn có thể sinh hoạt bình thường ngay sau khi làm dịch vụ.",
      },
    ],
  },
  "phun-mi-mo-trong": {
    title: "Phun Mí Mở Tròng: Điểm Nhấn Cho Đôi Mắt Có Hồn",
    category: "Phun mí",
    image: "/hero-portrait.png",
    date: "05 Tháng 5, 2026",
    author: "Phuoc Lai Master",
    readTime: "3 phút đọc",
    intro: "Một đường mí mảnh sát chân mi sẽ giúp đôi mắt trông to tròn, long lanh và sâu thẳm hơn mà không cần tốn thời gian kẻ mắt mỗi ngày.",
    sections: [
      {
        heading: "Tinh tế trong từng đường kim",
        content: "Đường mí được thiết kế siêu mảnh, chỉ chạm nhẹ vào hàng mi để tạo hiệu ứng đen mướt tự nhiên nhất.",
      },
    ],
  },
  "tu-van-ca-nhan-hoa": {
    title: "Tư Vấn Cá Nhân Hóa: Thiết Kế Vẻ Đẹp Riêng Biệt",
    category: "Tư vấn",
    image: "/studio-interior.png",
    date: "01 Tháng 5, 2026",
    author: "Phuoc Lai Director",
    readTime: "4 phút đọc",
    intro: "Chúng tôi không làm rập khuôn một dáng mày cho tất cả mọi người. Mỗi khách hàng là một bản thể duy nhất với cấu trúc xương mặt riêng biệt.",
    sections: [
      {
        heading: "Phân tích tỉ lệ vàng",
        content: "Dựa trên nhân tướng học và thẩm mỹ hiện đại, chúng tôi sẽ phác thảo dáng mày giúp tôn vinh những ưu điểm và khắc phục khuyết điểm trên gương mặt bạn.",
      },
    ],
  },
  "bao-hanh-cham-soc": {
    title: "Chính Sách Bảo Hành & Chăm Sóc Tận Tâm",
    category: "Hậu mãi",
    image: "/training-1.png",
    date: "28 Tháng 4, 2026",
    author: "Phuoc Lai Care",
    readTime: "3 phút đọc",
    intro: "Sự hài lòng của khách hàng không chỉ dừng lại ở lúc hoàn thành dịch vụ, mà kéo dài suốt quá trình hồi phục và sử dụng sau đó.",
    sections: [
      {
        heading: "Cam kết đồng hành",
        content: "Chúng tôi có chế độ bảo hành dặm lại miễn phí và đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc 24/7.",
      },
    ],
  },
};

export default function ServiceDetail() {
  const [location] = useLocation();
  const slug = location.split("/").pop() || "";
  const data = serviceData[slug];

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFFFF] pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl">Không tìm thấy dịch vụ</h1>
          <Link href="/dich-vu" className="mt-4 block text-black/60 hover:text-black">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] text-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent" />
        <div className="absolute bottom-10 left-0 w-full px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/dich-vu" className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/60 hover:text-black transition-colors">
                <ChevronLeft size={14} /> Quay lại dịch vụ
              </Link>
              <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.4em] text-black/45">
                {data.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight">
                {data.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto max-w-4xl px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="mb-10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.15em] text-black/45 border-b border-black/5 pb-8">
              <span className="flex items-center gap-2"><Calendar size={14} /> {data.date}</span>
              <span className="flex items-center gap-2"><User size={14} /> {data.author}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {data.readTime}</span>
            </div>

            <div className="prose prose-neutral max-w-none">
              <p className="text-lg font-light leading-relaxed text-black/80 italic mb-12 border-l-2 border-black/10 pl-6">
                {data.intro}
              </p>

              {data.sections.map((section, idx) => (
                <div key={idx} className="mb-12">
                  <h2 className="font-serif text-2xl mb-6 text-[#1A1A1A]">{section.heading}</h2>
                  <p className="text-base font-light leading-relaxed text-black/70 mb-6">
                    {section.content}
                  </p>
                  {section.image && (
                    <img src={section.image} alt={section.heading} className="w-full rounded-lg mb-6 grayscale" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-black/5 pt-10 flex items-center justify-between">
              <div className="flex gap-4">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors">
                  <Share2 size={16} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors">
                  <MessageSquare size={16} />
                </button>
              </div>
              <Button asChild className="rounded-full bg-[#1A1A1A] px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-white hover:bg-black">
                <Link href="/lien-he">Đặt lịch tư vấn ngay</Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-12">
              <div className="rounded-2xl bg-white/40 p-8 backdrop-blur-sm border border-black/5">
                <h3 className="font-serif text-xl mb-6 uppercase tracking-wider">Dịch vụ khác</h3>
                <div className="space-y-6">
                  {Object.entries(serviceData)
                    .filter(([s]) => s !== slug)
                    .slice(0, 3)
                    .map(([s, d]) => (
                      <Link key={s} href={`/dich-vu/${s}`} className="group block">
                        <span className="block text-[9px] uppercase tracking-[0.3em] text-black/40 mb-2">{d.category}</span>
                        <h4 className="text-sm font-medium leading-snug group-hover:text-black/60 transition-colors">{d.title}</h4>
                      </Link>
                    ))}
                </div>
                <Link href="/dich-vu" className="mt-8 block text-[10px] uppercase tracking-[0.2em] font-medium border-t border-black/5 pt-6 hover:opacity-70 transition-opacity">
                  Xem tất cả dịch vụ &rarr;
                </Link>
              </div>

              <div className="rounded-2xl bg-[#1A1A1A] p-8 text-white">
                <h3 className="font-serif text-xl mb-4">Phuoc Lai Luxury</h3>
                <p className="text-xs font-light text-white/60 leading-relaxed mb-8 uppercase tracking-[0.12em]">
                  Nơi vẻ đẹp tự nhiên được tôn vinh qua đôi bàn tay nghệ sĩ.
                </p>
                <Button asChild className="w-full rounded-full border border-white/20 bg-transparent text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black">
                  <Link href="/ve-chung-toi">Về chúng tôi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
