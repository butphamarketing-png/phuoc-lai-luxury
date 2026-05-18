import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus } from "lucide-react";

const btnPrimary =
  "rounded-full bg-[#1A1A1A] text-white hover:bg-black px-10 py-6 text-[11px] uppercase tracking-[0.25em] border-none";

import { useLocation } from "wouter";

const allCourses = {
  "phun-xam": [
    {
      img: "/training-1.png",
      level: "KHÓA NÂNG CAO",
      slug: "amazing-brows",
      title: "KHÓA HỌC SỢI AMAZINGBROWS NÂNG CAO",
      desc: "Kỹ thuật tạo sợi siêu thực AMAZINGBROWS đỉnh cao dành cho thợ lành nghề.",
      duration: "THỜI GIAN: 5 NGÀY",
      children: ["Kỹ thuật sợi siêu thực", "Dáng mày phong thủy", "Xử lý nền cũ", "Chụp ảnh sản phẩm"],
    },
    {
      img: "/training-2.png",
      level: "KHÓA CHUYÊN SÂU",
      slug: "lip-master",
      title: "KHÓA HỌC MÔI CHUYÊN SÂU",
      desc: "Bí quyết phun môi SEXYLIPS không sưng, bám màu nhanh.",
      duration: "THỜI GIAN: 4 NGÀY",
      children: ["Kỹ thuật môi không sưng", "Công thức pha màu", "Khử thâm chuyên sâu", "Chăm sóc sau làm"],
    },
    {
      img: "/training-3.png",
      level: "KHÓA TỔNG HỢP",
      slug: "master-advanced",
      title: "KHÓA HỌC TỔNG HỢP CHUYÊN SÂU",
      desc: "Trọn bộ kiến thức từ sợi, mày, môi và mí phượng hoàng.",
      duration: "THỜI GIAN: 15 NGÀY",
      children: ["Tổng hợp kỹ thuật PMU", "Quy trình Master", "Quản lý Studio", "Đào tạo học viên"],
    },
  ],
  "spa": [
    {
      img: "/training-1.png",
      level: "KHÓA CƠ BẢN",
      slug: "spa-basic",
      title: "SPA BASIC",
      desc: "Kiến thức nền tảng về chăm sóc da cơ bản.",
      duration: "THỜI GIAN: 7 NGÀY",
      children: ["Cấu trúc da", "Quy trình chăm sóc", "Sử dụng máy cơ bản", "Vệ sinh vô trùng"],
    },
    {
      img: "/training-2.png",
      level: "KHÓA NÂNG CAO",
      slug: "spa-advanced",
      title: "SPA ADVANCED",
      desc: "Kỹ thuật chăm sóc da chuyên sâu và công nghệ cao.",
      duration: "THỜI GIAN: 10 NGÀY",
      children: ["Trị liệu da liễu", "Công nghệ Laser/Hifu", "Peel da chuyên sâu", "Kỹ thuật massage"],
    },
    {
      img: "/training-3.png",
      level: "KHÓA CHUYÊN GIA",
      slug: "spa-expert",
      title: "SPA EXPERT",
      desc: "Đào tạo quản lý và vận hành hệ thống spa chuyên nghiệp.",
      duration: "THỜI GIAN: 15 NGÀY",
      children: ["Quản trị nhân sự", "Marketing Spa", "Xây dựng menu", "Tư vấn khách hàng"],
    },
    {
      img: "/training-4.png",
      level: "KHÓA TRỊ LIỆU",
      slug: "spa-therapy",
      title: "SPA THERAPY",
      desc: "Các liệu pháp trị liệu đặc biệt và phục hồi da.",
      duration: "THỜI GIAN: 5 NGÀY",
      children: ["Phục hồi da tổn thương", "Trị liệu Mesotherapy", "Lăn kim/Phi kim", "Chăm sóc sau trị liệu"],
    },
  ]
};

export default function Training() {
  const [location] = useLocation();
  const category = location.includes("/phun-xam") 
    ? "phun-xam" 
    : location.includes("/spa") 
      ? "spa" 
      : null;

  const filteredCourses = category 
    ? allCourses[category as keyof typeof allCourses]
    : [...allCourses["phun-xam"], ...allCourses["spa"]];

  const displayTitle = category === "phun-xam" 
    ? "Khóa Học Phun Xăm Thẩm Mỹ" 
    : category === "spa" 
      ? "Khóa Học Spa & Chăm Sóc Da" 
      : "Chương trình đào tạo Master";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-[#FFFFFF] text-[#1A1A1A] pt-32 pb-24"
      data-testid="page-training"
    >
      {/* Khóa học */}
      <section className="bg-[#FFFFFF]" data-testid="section-courses">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-black/50 mb-4 block">
              {category ? category.replace("-", " ") : "CHƯƠNG TRÌNH ĐÀO TẠO"}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
              {displayTitle}
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 md:grid-cols-2 ${category === "phun-xam" ? "lg:grid-cols-3 max-w-6xl mx-auto" : "lg:grid-cols-4"} gap-8`}
          >
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col bg-white text-black overflow-hidden rounded-2xl border border-black/5 group h-full shadow-sm hover:shadow-xl transition-all duration-500"
                data-testid={`card-training-${idx}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 p-5 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0 z-20">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/45 font-bold">Nội dung khóa</p>
                    <ul className="space-y-2">
                      {course.children.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs font-light uppercase tracking-[0.12em] text-white/75">
                          <span className="h-px w-4 bg-white/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow z-10 relative">
                  <span className="text-[10px] text-black/40 uppercase tracking-[0.3em] font-bold mb-4 block">
                    {course.level}
                  </span>
                  <h3 className="font-serif text-2xl leading-tight mb-4">{course.title}</h3>
                  <p className="text-sm text-black/50 font-light mb-8 flex-grow">{course.desc}</p>
                  <Link href={`/dao-tao/${course.slug}`} className="flex items-center justify-between pt-6 border-t border-black/5 cursor-pointer group/btn mt-auto">
                    <span className="text-[10px] text-black/40 font-bold uppercase tracking-[0.25em] group-hover/btn:text-black transition-colors">Xem chi tiết</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-all duration-500 group-hover/btn:bg-black group-hover/btn:text-white luxury-shadow">
                      <Plus size={16} />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
