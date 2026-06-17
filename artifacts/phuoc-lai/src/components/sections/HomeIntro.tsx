import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Link } from "wouter";

export default function HomeIntro() {
  const { t } = useLang();

  return (
    <section className="bg-[#ebebeb] py-[88px] md:py-[100px]">
      <div className="pl-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[520px]"
          >
            <p className="pl-label pl-label-light mb-5">{t.home.intro.label}</p>
            <h2 className="pl-heading-xl text-[#1a1a1a] mb-6">
              Nâng tầm thần thái
              <br />
              từ từng sợi mày
            </h2>
            <div className="pl-divider mb-7" />
            <p className="text-[14px] font-light leading-[1.85] text-[#1a1a1a]/60 mb-10 max-w-[420px]">
              {t.home.intro.desc}
            </p>
            <Link href="/ve-chung-toi">
              <span className="pl-btn-solid cursor-pointer">
                XEM THÊM <span aria-hidden>→</span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[560px] lg:ml-auto aspect-square"
          >
            <img
              src="/intro-interior.png"
              alt="Phuoc Lai Studio"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
