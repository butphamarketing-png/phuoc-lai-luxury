import { motion } from "framer-motion";
import { SiFacebook, SiZalo, SiInstagram, SiMessenger } from "react-icons/si";

const socials = [
  { name: "FACEBOOK", icon: SiFacebook, handle: "/phuoclai.pmu", cta: "Theo dõi ngay", href: "https://facebook.com/phuoclai.pmu" },
  { name: "ZALO", icon: SiZalo, handle: "0909 203 108", cta: "Nhắn tin ngay", href: "https://zalo.me/0909203108" },
  { name: "INSTAGRAM", icon: SiInstagram, handle: "@phuoclai.pmu", cta: "Theo dõi ngay", href: "https://instagram.com/phuoclai.pmu" },
  { name: "MESSENGER", icon: SiMessenger, handle: "Phuoc Lai PMU", cta: "Nhắn tin ngay", href: "https://m.me/phuoclai.pmu" },
];

export default function SocialSection() {
  return (
    <section className="py-20 md:py-24 bg-card" data-testid="section-social">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span
            className="text-[10px] uppercase tracking-[0.4em] font-medium text-foreground/50 mb-4 block"
            data-testid="text-social-eyebrow"
          >
            THEO DÕI &amp; LIÊN HỆ
          </span>
          <h2
            className="text-3xl md:text-4xl font-serif text-foreground"
            data-testid="text-social-title"
          >
            Kết nối với chúng tôi
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {socials.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group flex flex-col items-center rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              data-testid={`card-social-${idx}`}
            >
              <social.icon
                size={28}
                className="mb-6 text-foreground/60 group-hover:text-foreground transition-colors"
              />
              <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-foreground">
                {social.name}
              </h4>
              <p className="text-sm text-foreground/60 font-light mb-6">{social.handle}</p>
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground font-medium pb-1 border-b border-border/80 group-hover:border-foreground/40 transition-colors">
                {social.cta} &rarr;
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
