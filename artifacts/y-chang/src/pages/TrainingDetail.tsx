import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Clock, User, Calendar, Share2, MessageSquare, BookOpen, Award, CheckCircle } from "lucide-react";
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
  }[];
}

const trainingData: Record<string, TrainingContent> = {
  "amazing-brows": {
    title: "Khóa Học Sợi AMAZINGBROWS Nâng Cao",
    level: "Khóa nâng cao",
    image: "/training-1.png",
    date: "20 Tháng 5, 2026",
    instructor: "Master Phuoc Lai",
    duration: "5 Ngày",
    intro: "Kỹ thuật tạo sợi siêu thực AMAZINGBROWS đỉnh cao dành cho thợ lành nghề muốn nâng cấp kỹ thuật lên một tầm cao mới.",
    curriculum: ["Kỹ thuật sợi siêu thực", "Dáng mày phong thủy", "Xử lý nền cũ", "Kỹ năng chụp ảnh sản phẩm"],
    sections: [
      {
        heading: "Làm chủ sợi AMAZINGBROWS",
        content: "Học viên được hướng dẫn chi tiết cách đi sợi bằng máy nano, tạo độ mềm mại và chân thực như sợi lông mày thật.",
      },
    ],
  },
  "lip-master": {
    title: "Khóa Học Môi Chuyên Sâu",
    level: "Khóa chuyên sâu",
    image: "/training-2.png",
    date: "22 Tháng 5, 2026",
    instructor: "Master Phuoc Lai",
    duration: "4 Ngày",
    intro: "Khám phá bí quyết phun môi SEXYLIPS không sưng, bám màu nhanh và kỹ thuật khử thâm môi chuyên sâu.",
    curriculum: ["Kỹ thuật phun môi không sưng", "Công thức pha màu môi", "Xử lý môi thâm nặng", "Chăm sóc sau phun"],
    sections: [
      {
        heading: "Nghệ thuật phun môi SEXYLIPS",
        content: "Học cách tạo ra đôi môi căng mọng, màu sắc trong trẻo và tự nhiên nhất cho khách hàng.",
      },
    ],
  },
  "master-advanced": {
    title: "Khóa Học Tổng Hợp Chuyên Sâu",
    level: "Khóa chuyên gia",
    image: "/training-3.png",
    date: "25 Tháng 5, 2026",
    instructor: "Grand Master Phuoc Lai",
    duration: "15 Ngày",
    intro: "Trọn bộ kiến thức từ sợi, mày, môi và mí phượng hoàng chuyên sâu dành cho người muốn trở thành Master thực thụ.",
    curriculum: ["Tổng hợp kỹ thuật mày sợi", "Kỹ thuật phun môi/mí", "Quản lý Studio chuyên nghiệp", "Đào tạo học viên"],
    sections: [
      {
        heading: "Hành trình trở thành Master",
        content: "Chúng tôi trang bị cho bạn đầy đủ kiến thức và kỹ năng để tự tin mở studio và đào tạo thế hệ kế cận.",
      },
    ],
  },
};

export default function TrainingDetail() {
  const [location] = useLocation();
  const slug = location.split("/").pop() || "";
  const data = trainingData[slug];

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#DCDCDC] pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl">Không tìm thấy khóa học</h1>
          <Link href="/dao-tao" className="mt-4 block text-black/60 hover:text-black">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#DCDCDC] text-[#1A1A1A]">
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#DCDCDC] via-transparent to-transparent" />
        <div className="absolute bottom-10 left-0 w-full px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/dao-tao" className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/60 hover:text-black transition-colors">
                <ChevronLeft size={14} /> Quay lại đào tạo
              </Link>
              <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.4em] text-black/45">
                {data.level}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight">
                {data.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <div className="mb-10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.15em] text-black/45 border-b border-black/5 pb-8">
              <span className="flex items-center gap-2"><Calendar size={14} /> {data.date}</span>
              <span className="flex items-center gap-2"><User size={14} /> {data.instructor}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {data.duration}</span>
            </div>

            <div className="prose prose-neutral max-w-none">
              <p className="text-lg font-light leading-relaxed text-black/80 italic mb-12 border-l-2 border-black/10 pl-6">
                {data.intro}
              </p>

              <div className="mb-12 rounded-2xl bg-white/40 p-8 backdrop-blur-sm border border-black/5">
                <h3 className="font-serif text-xl mb-6 flex items-center gap-3">
                  <BookOpen size={20} className="text-black/60" /> Nội dung chương trình
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm font-light text-black/70">
                      <CheckCircle size={16} className="mt-0.5 text-black/40 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

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
                <Link href="/lien-he">Đăng ký nhập học</Link>
              </Button>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-12">
              <div className="rounded-2xl bg-white/40 p-8 backdrop-blur-sm border border-black/5">
                <h3 className="font-serif text-xl mb-6 uppercase tracking-wider">Khóa học khác</h3>
                <div className="space-y-6">
                  {Object.entries(trainingData)
                    .filter(([s]) => s !== slug)
                    .slice(0, 3)
                    .map(([s, d]) => (
                      <Link key={s} href={`/dao-tao/${s}`} className="group block">
                        <span className="block text-[9px] uppercase tracking-[0.3em] text-black/40 mb-2">{d.level}</span>
                        <h4 className="text-sm font-medium leading-snug group-hover:text-black/60 transition-colors">{d.title}</h4>
                      </Link>
                    ))}
                </div>
                <Link href="/dao-tao" className="mt-8 block text-[10px] uppercase tracking-[0.2em] font-medium border-t border-black/5 pt-6 hover:opacity-70 transition-opacity">
                  Xem tất cả khóa học &rarr;
                </Link>
              </div>

              <div className="rounded-2xl bg-[#1A1A1A] p-8 text-white">
                <Award size={32} strokeWidth={1} className="mb-6 opacity-60" />
                <h3 className="font-serif text-xl mb-4">Chứng Chỉ Nghề</h3>
                <p className="text-xs font-light text-white/60 leading-relaxed mb-8 uppercase tracking-[0.12em]">
                  Hoàn thành khóa học và nhận chứng chỉ Master có giá trị toàn quốc từ Phuoc Lai Luxury Academy.
                </p>
                <Button asChild className="w-full rounded-full border border-white/20 bg-transparent text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black">
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
