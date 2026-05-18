import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { useState } from "react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    { 
      icon: <MessageCircle size={20} />, 
      label: "Zalo Chat", 
      href: "https://zalo.me/your-number",
      color: "bg-[#0068FF]" 
    },
    { 
      icon: <Calendar size={20} />, 
      label: "Đặt lịch ngay", 
      href: "/lien-he",
      color: "bg-gold" 
    },
    { 
      icon: <Phone size={20} />, 
      label: "Gọi hotline", 
      href: "tel:0900000000",
      color: "bg-[#1A1A1A]" 
    },
  ];

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
                key={idx}
                href={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-xl border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
                <div className={`h-12 w-12 ${item.color} text-white rounded-full flex items-center justify-center shadow-2xl luxury-shadow hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 gold-gradient text-white rounded-full flex items-center justify-center shadow-2xl luxury-shadow hover:scale-105 transition-transform z-10 relative overflow-hidden group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          className="relative z-10"
        >
          <MessageCircle size={28} />
        </motion.div>
        <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </button>
    </div>
  );
}
