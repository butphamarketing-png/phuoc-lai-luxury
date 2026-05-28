import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ServiceCategoryHero from "@/components/services/ServiceCategoryHero";

export default function ServicesCategoryHub() {
  return (
    <div className="bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ServiceCategoryHero />
      </motion.div>

      <section className="px-6 py-10 md:py-14 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-2 md:mb-3 font-bold"
        >
          PERMANENT MAKEUP AND SPA
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-serif text-2xl md:text-4xl leading-tight text-foreground mb-8 md:mb-10"
        >
          Dịch vụ bạn <span className="italic">quan tâm</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="flex w-full max-w-xl flex-col gap-4 sm:flex-row"
        >
          <Button
            asChild
            className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 md:py-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] luxury-shadow group"
          >
            <Link href="/dich-vu/phun-xam">
              PERMANENT MAKEUP{" "}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 md:py-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] luxury-shadow group"
          >
            <Link href="/dich-vu/spa">
              SPA{" "}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
