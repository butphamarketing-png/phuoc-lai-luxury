import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { useState, useMemo } from "react";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: settings = DEFAULT_SITE_SETTINGS } = useSiteSettings();

  const contacts = useMemo(
    () => [
      {
        icon: <MessageCircle size={20} />,
        label: "Zalo Chat",
        href: settings.zalo,
        color: "bg-[#0068FF]",
      },
      {
        icon: <Calendar size={20} />,
        label: "Đặt lịch ngay",
        href: "/lien-he",
        color: "bg-gold",
      },
      {
        icon: <Phone size={20} />,
        label: "Gọi hotline",
        href: `tel:${settings.phone.replace(/\s/g, "")}`,
        color: "bg-primary",
      },
    ],
    [settings.zalo, settings.phone],
  );

  return (
    <div className="fixed bottom-8 right-8 z-[9998] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col items-end gap-3 mb-2"
          >
            {contacts.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-card/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-xl border border-border/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
                <div
                  className={`h-12 w-12 ${item.color} text-white rounded-full flex items-center justify-center shadow-2xl luxury-shadow hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 bg-gold text-white rounded-full flex items-center justify-center shadow-2xl luxury-shadow hover:scale-110 transition-transform z-50"
        aria-label="Liên hệ nhanh"
      >
        <MessageCircle size={28} className={isOpen ? "rotate-12" : ""} />
      </button>
    </div>
  );
}
