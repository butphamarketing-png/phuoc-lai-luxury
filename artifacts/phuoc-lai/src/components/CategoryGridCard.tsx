import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "wouter";
import { resolveMediaUrl } from "@/lib/media";

interface CategoryGridCardProps {
  title: string;
  image: string;
  children: string[];
  index: number;
  dark?: boolean;
  href?: string;
}

export default function CategoryGridCard({
  title,
  image,
  children,
  index,
  dark = true,
  href,
}: CategoryGridCardProps) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
      className="group relative"
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden mb-5 ${
          dark ? "bg-[#1a1a1a]" : "bg-[#f0f0f0]"
        }`}
      >
        <img
          src={resolveMediaUrl(image)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <motion.div
          initial={false}
          className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/50 mb-3">
            Chi tiết
          </p>
          <ul className="space-y-2">
            {children.map((child) => (
              <li
                key={child}
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white border-b border-white/10 pb-2 last:border-0"
              >
                {child}
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full border border-white/30 bg-black/40 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
          <Plus size={14} />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span
          className={`text-[10px] font-bold tracking-widest uppercase ${
            dark ? "text-white/30" : "text-black/30"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <motion.div
          className={`h-px transition-all duration-500 group-hover:w-12 ${
            dark ? "w-8 bg-white/20" : "w-8 bg-black/20"
          }`}
        />
      </div>
      <h3
        className={`text-sm font-bold tracking-[0.2em] uppercase ${
          dark ? "text-white" : "text-[#1a1a1a]"
        }`}
      >
        {title}
      </h3>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href}>
        <span className="block cursor-pointer">{card}</span>
      </Link>
    );
  }

  return card;
}
