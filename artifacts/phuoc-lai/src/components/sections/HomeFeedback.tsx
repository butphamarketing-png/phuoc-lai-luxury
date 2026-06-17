import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Star } from "lucide-react";
import { Link } from "wouter";

export default function HomeFeedback() {
  const { t } = useLang();

  return (
    <section className="bg-[#1a1a1a] text-white py-[88px] md:py-[100px]">
      <div className="pl-container">
        <div className="text-center mb-14">
          <p className="pl-label pl-label-dark mb-4">FEEDBACK HỌC VIÊN</p>
          <h2 className="pl-heading-lg text-white max-w-[640px] mx-auto">{t.home.feedback.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {t.home.feedback.items.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="bg-[#e8e8e8] text-[#1a1a1a] p-6 flex flex-col min-h-[260px]"
            >
              <div className="flex gap-0.5 mb-4 text-[#c9a227]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[12px] font-light leading-[1.8] text-[#1a1a1a]/70 flex-1 mb-6">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
                  <img
                    src={`/avatar-${(idx % 3) + 1}.png`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#1a1a1a]">{item.name}</p>
                  <p
                    className="text-[9px] uppercase tracking-[0.14em] text-[#1a1a1a]/45 mt-0.5"
                    style={{ fontFamily: "var(--app-font-sans)" }}
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/feedback">
            <span className="pl-btn-outline cursor-pointer">XEM TẤT CẢ FEEDBACK →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
