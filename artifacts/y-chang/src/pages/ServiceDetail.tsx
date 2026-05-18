import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Clock, User, Calendar, Share2, MessageSquare, CheckCircle2 } from "lucide-react";
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
    list?: string[];
  }[];
}

const serviceData: Record<string, ServiceContent> = {
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
};

export default function ServiceDetail() {
  const [match, params] = useRoute("/dich-vu/:slug");
  const slug = params?.slug || "";
  const data = serviceData[slug];

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Không tìm thấy dịch vụ</h1>
          <p className="text-black/50 mb-8">Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
          <Button asChild className="rounded-full bg-black text-white px-8">
            <Link href="/dich-vu">Quay lại danh sách</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute bottom-12 left-0 w-full px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/dich-vu" className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-all group">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 group-hover:bg-black group-hover:text-white transition-all">
                  <ChevronLeft size={14} />
                </span>
                Quay lại dịch vụ
              </Link>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">
                {data.category}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl">
                {data.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12 flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-black/40 border-b border-black/5 pb-10"
            >
              <span className="flex items-center gap-3"><Calendar size={14} className="text-black/20" /> {data.date}</span>
              <span className="flex items-center gap-3"><User size={14} className="text-black/20" /> {data.author}</span>
              <span className="flex items-center gap-3"><Clock size={14} className="text-black/20" /> {data.readTime}</span>
            </motion.div>

            <div className="prose prose-neutral max-w-none">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-black/70 italic mb-16 border-l-4 border-black/5 pl-8 py-2">
                "{data.intro}"
              </p>

              {data.sections.map((section, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-16"
                >
                  <h2 className="font-serif text-3xl md:text-4xl mb-8 text-[#1A1A1A]">{section.heading}</h2>
                  <p className="text-lg font-light leading-relaxed text-black/60 mb-8">
                    {section.content}
                  </p>
                  
                  {section.list && (
                    <ul className="space-y-4 mb-8">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-base font-light text-black/70">
                          <CheckCircle2 size={18} className="text-black/20 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.image && (
                    <div className="overflow-hidden rounded-2xl shadow-xl mb-8">
                      <img src={section.image} alt={section.heading} className="w-full grayscale hover:grayscale-0 transition-all duration-1000" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-20 border-t border-black/5 pt-12 flex flex-col sm:flex-row items-center justify-between gap-8"
            >
              <div className="flex gap-6">
                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-black/5 hover:bg-black hover:text-white transition-all shadow-sm">
                  <Share2 size={18} />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-black/5 hover:bg-black hover:text-white transition-all shadow-sm">
                  <MessageSquare size={18} />
                </button>
              </div>
              <Button asChild className="rounded-full bg-black px-12 py-7 text-[11px] uppercase tracking-[0.3em] text-white hover:bg-black/90 luxury-shadow">
                <Link href="/lien-he">Đặt lịch tư vấn ngay</Link>
              </Button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-12">
              <div className="rounded-3xl bg-[#FAFAFA] p-10 border border-black/[0.03] luxury-shadow">
                <h3 className="font-serif text-2xl mb-8 uppercase tracking-wider">Dịch vụ khác</h3>
                <div className="space-y-8">
                  {Object.entries(serviceData)
                    .filter(([s]) => s !== slug)
                    .slice(0, 4)
                    .map(([s, d]) => (
                      <Link key={s} href={`/dich-vu/${s}`} className="group block">
                        <span className="block text-[10px] uppercase tracking-[0.4em] text-black/30 mb-2 font-bold">{d.category}</span>
                        <h4 className="text-base font-serif leading-tight group-hover:text-black/50 transition-colors">{d.title}</h4>
                        <div className="mt-4 h-px w-0 bg-black/10 group-hover:w-full transition-all duration-500" />
                      </Link>
                    ))}
                </div>
                <Link href="/dich-vu" className="mt-12 block text-[10px] uppercase tracking-[0.3em] font-bold border-t border-black/5 pt-8 hover:opacity-50 transition-opacity text-center">
                  Xem tất cả dịch vụ &rarr;
                </Link>
              </div>

              <div className="rounded-3xl bg-[#1A1A1A] p-10 text-white shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-1000 group-hover:scale-150" />
                <h3 className="font-serif text-3xl mb-6 relative z-10">Phuoc Lai Luxury</h3>
                <p className="text-[11px] font-light text-white/50 leading-relaxed mb-10 uppercase tracking-[0.2em] relative z-10">
                  Kiến tạo vẻ đẹp độc bản qua từng đường nét nghệ thuật.
                </p>
                <Button asChild className="w-full rounded-full border border-white/20 bg-transparent py-7 text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all relative z-10">
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
