import { motion } from "framer-motion";
import { HOME_FAQ } from "@/lib/seo";

export default function HomeFaqSection() {
  return (
    <section
      className="bg-background border-t border-border/60 py-24 px-6"
      aria-labelledby="home-faq-heading"
    >
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="mb-4 block text-[10px] uppercase tracking-[0.4em] text-foreground/40">
            FAQ
          </span>
          <h2
            id="home-faq-heading"
            className="font-serif text-3xl md:text-4xl text-foreground"
          >
            Câu hỏi thường gặp
          </h2>
        </motion.div>

        <div className="space-y-4">
          {HOME_FAQ.map((faq, idx) => (
            <motion.details
              key={faq.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group rounded-2xl border border-border/60 bg-card p-6 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-medium text-foreground pr-4 marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm font-light leading-relaxed text-foreground/65">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
