import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Clock, User, Calendar, Share2, MessageSquare, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrainingContent {
  title: string;
  level: string;
  image: string;
  date: string;
  instructor: string;
  duration: string;
  intro: string;
  curriculum: string[];
  sections: {
    heading: string;
    content: string;
    image?: string;
    list?: string[];
  }[];
}

const trainingData: Record<string, TrainingContent> = {
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
};

export default function TrainingDetail() {
  const [match, params] = useRoute("/dao-tao/:slug");
  const slug = params?.slug || "";
  const data = trainingData[slug];

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Không tìm thấy khóa học</h1>
          <p className="text-black/50 mb-8">Chương trình đào tạo này không tồn tại hoặc đã được cập nhật mới.</p>
          <Button asChild className="rounded-full bg-black text-white px-8">
            <Link href="/dao-tao">Quay lại danh sách</Link>
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
              <Link href="/dao-tao" className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-all group">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 group-hover:bg-black group-hover:text-white transition-all">
                  <ChevronLeft size={14} />
                </span>
                Quay lại đào tạo
              </Link>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">
                {data.level}
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
              <span className="flex items-center gap-3"><User size={14} className="text-black/20" /> {data.instructor}</span>
              <span className="flex items-center gap-3"><Clock size={14} className="text-black/20" /> {data.duration}</span>
            </motion.div>

            <div className="prose prose-neutral max-w-none">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-black/70 italic mb-16 border-l-4 border-black/5 pl-8 py-2">
                "{data.intro}"
              </p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 rounded-3xl bg-[#FAFAFA] p-10 border border-black/[0.03] luxury-shadow"
              >
                <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
                  <BookOpen size={24} className="text-black/20" /> Nội dung chương trình
                </h3>
                <div className="grid grid-cols-1 gap-5">
                  {data.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 text-base font-light text-black/70">
                      <CheckCircle2 size={18} className="mt-1 text-black/20 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

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
                <Link href="/lien-he">Đăng ký nhập học ngay</Link>
              </Button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-12">
              <div className="rounded-3xl bg-[#FAFAFA] p-10 border border-black/[0.03] luxury-shadow">
                <h3 className="font-serif text-2xl mb-8 uppercase tracking-wider">Khóa học khác</h3>
                <div className="space-y-8">
                  {Object.entries(trainingData)
                    .filter(([s]) => s !== slug)
                    .slice(0, 4)
                    .map(([s, d]) => (
                      <Link key={s} href={`/dao-tao/${s}`} className="group block">
                        <span className="block text-[10px] uppercase tracking-[0.4em] text-black/30 mb-2 font-bold">{d.level}</span>
                        <h4 className="text-base font-serif leading-tight group-hover:text-black/50 transition-colors">{d.title}</h4>
                        <div className="mt-4 h-px w-0 bg-black/10 group-hover:w-full transition-all duration-500" />
                      </Link>
                    ))}
                </div>
                <Link href="/dao-tao" className="mt-12 block text-[10px] uppercase tracking-[0.3em] font-bold border-t border-black/5 pt-8 hover:opacity-50 transition-opacity text-center">
                  Xem tất cả khóa học &rarr;
                </Link>
              </div>

              <div className="rounded-3xl bg-[#1A1A1A] p-10 text-white shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-1000 group-hover:scale-150" />
                <Award size={40} strokeWidth={1} className="mb-8 opacity-40 relative z-10" />
                <h3 className="font-serif text-3xl mb-6 relative z-10">Chứng Chỉ Quốc Tế</h3>
                <p className="text-[11px] font-light text-white/50 leading-relaxed mb-10 uppercase tracking-[0.2em] relative z-10">
                  Hoàn thành khóa học và nhận bằng Master từ Phuoc Lai Luxury Academy.
                </p>
                <Button asChild className="w-full rounded-full border border-white/20 bg-transparent py-7 text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all relative z-10">
                  <Link href="/lien-he">Nhận tư vấn nghề</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
