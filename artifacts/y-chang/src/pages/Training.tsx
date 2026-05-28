import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus } from "lucide-react";

const btnPrimary =
  "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-[11px] uppercase tracking-[0.25em] border-none";

import { useLocation } from "wouter";
import { usePublicTraining } from "@/hooks/use-site-content";
import type { TrainingCategory } from "@/data/catalog";

export default function Training() {
  const [location] = useLocation();
  const category: TrainingCategory | null = location.includes("/phun-xam")
    ? "phun-xam"
    : location.includes("/spa")
      ? "spa"
      : null;

  const { data: filteredCourses = [], isLoading } = usePublicTraining(
    category ?? undefined,
  );

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
      className="w-full bg-background text-foreground pt-32 pb-24"
      data-testid="page-training"
    >
      {/* Khóa học */}
      <section className="bg-background" data-testid="section-courses">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-foreground/50 mb-4 block">
              {category ? category.replace("-", " ") : "CHƯƠNG TRÌNH ĐÀO TẠO"}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
              {displayTitle}
            </h1>
          </div>
          {isLoading && (
            <p className="text-center text-foreground/40 text-sm py-16">Đang tải khóa học...</p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 md:grid-cols-2 ${category === "phun-xam" ? "lg:grid-cols-3 max-w-6xl mx-auto" : "lg:grid-cols-4"} gap-8`}
          >
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col bg-card text-card-foreground overflow-hidden rounded-2xl border border-border/60 group h-full shadow-sm hover:shadow-xl transition-all duration-500"
                data-testid={`card-training-${idx}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 p-5 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0 z-20">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/45 font-bold">Nội dung khóa</p>
                    <ul className="space-y-2">
                      {course.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs font-light uppercase tracking-[0.12em] text-white/75">
                          <span className="h-px w-4 bg-white/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow z-10 relative">
                  <span className="text-[10px] text-foreground/40 uppercase tracking-[0.3em] font-bold mb-4 block">
                    {course.level}
                  </span>
                  <h3 className="font-serif text-2xl leading-tight mb-4">{course.title}</h3>
                  <p className="text-sm text-foreground/55 font-light mb-8 flex-grow">{course.description}</p>
                  <Link href={`/dao-tao/${course.slug}`} className="flex items-center justify-between pt-6 border-t border-border/60 cursor-pointer group/btn mt-auto">
                    <span className="text-[10px] text-foreground/45 font-bold uppercase tracking-[0.25em] group-hover/btn:text-foreground transition-colors">Xem chi tiết</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 transition-all duration-500 group-hover/btn:bg-primary group-hover/btn:text-primary-foreground luxury-shadow">
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
