import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSiteSettings, useSubmitLead } from "@/hooks/useSiteData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Contact() {
  const { t } = useLang();
  const { toast } = useToast();
  const { data: settings } = useSiteSettings();
  const submitLead = useSubmitLead();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });

  usePageMeta({
    title: "Liên hệ | Phuoc Lai Luxury",
    description: "Liên hệ Phuoc Lai Luxury Vũng Tàu — tư vấn dịch vụ phun xăm, spa và đào tạo nghề.",
    path: "/lien-he",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập họ tên và số điện thoại.",
      });
      return;
    }

    const noteParts = [];
    if (form.email.trim()) noteParts.push(`Email: ${form.email.trim()}`);
    if (form.interest.trim()) noteParts.push(`Quan tâm: ${form.interest.trim()}`);
    if (form.message.trim()) noteParts.push(form.message.trim());

    try {
      await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        serviceInterest: form.interest.trim() || "Liên hệ chung",
        note: noteParts.join(" · "),
        source: "contact",
      });
      toast({
        title: "Đã gửi tin nhắn",
        description: "Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
      });
      setForm({ name: "", phone: "", email: "", interest: "", message: "" });
    } catch {
      toast({
        variant: "destructive",
        title: "Không gửi được",
        description: `Vui lòng gọi hotline ${settings?.phoneDisplay ?? "0909 203 108"}.`,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfdfb] text-[#1a1a1a] w-full overflow-x-hidden relative">
      <Navbar />
      
      <section className="relative pt-48 pb-24 overflow-hidden bg-[#111] text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="/hero-bg.png" alt="Bg" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 mb-6 block"
          >
            GET IN TOUCH
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-8"
          >
            {t.contactPage.title}
          </motion.h1>
          <div className="w-20 h-[1px] bg-white/20 mx-auto" />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-16"
            >
              <div>
                <h2 className="text-3xl font-serif mb-8">Chúng tôi luôn ở đây để lắng nghe bạn</h2>
                <p className="text-[#1a1a1a]/50 font-light leading-relaxed mb-12">
                  Dù bạn có thắc mắc về dịch vụ hay muốn tư vấn về lộ trình đào tạo, đừng ngần ngại liên hệ với chúng tôi. Đội ngũ chuyên gia của Phuoc Lai Luxury luôn sẵn sàng hỗ trợ bạn.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/40 flex items-center gap-2">
                    <MapPin size={14} /> Address
                  </h4>
                  <p className="text-sm font-light leading-loose">
                    {settings?.address ?? "42a Bà Triệu, Phường 1, TP Vũng Tàu"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/40 flex items-center gap-2">
                    <Phone size={14} /> Hotline
                  </h4>
                  <p className="text-sm font-light leading-loose">
                    {settings?.phoneDisplay ?? "0909 203 108"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/40 flex items-center gap-2">
                    <Mail size={14} /> Email
                  </h4>
                  <p className="text-sm font-light leading-loose">
                    {settings?.email ?? "Phuocduocvt13@gmai.com"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/40 flex items-center gap-2">
                    <Clock size={14} /> Opening Hours
                  </h4>
                  <p className="text-sm font-light leading-loose">
                    {settings?.hours ?? "9:00 - 19:00 hàng ngày"}
                  </p>
                </div>
              </div>

              <div className="w-full aspect-video bg-black/5 border border-black/5 flex items-center justify-center grayscale overflow-hidden">
                <iframe
                  title="Bản đồ Phuoc Lai Luxury"
                  src="https://maps.google.com/maps?q=42a+B%C3%A0+Tri%E1%BB%87u,+V%C5%A9ng+T%C3%A0u&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-white p-8 md:p-16 shadow-2xl border border-black/5"
            >
              <h3 className="text-2xl font-serif mb-12">Gửi tin nhắn cho chúng tôi</h3>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40">Họ và tên</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/10 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40">Số điện thoại</Label>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/10 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40">Địa chỉ Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/10 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40">Bạn quan tâm đến</Label>
                  <Input
                    placeholder="Ví dụ: Phun mày, Khóa học Master..."
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/10 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black transition-all placeholder:text-black/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40">Nội dung tin nhắn</Label>
                  <Textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/10 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full h-16 rounded-none bg-[#111] text-white hover:bg-black uppercase tracking-[0.3em] text-[10px] font-bold transition-all hover:scale-[1.02]"
                >
                  {submitLead.isPending ? "Đang gửi..." : "Gửi thông tin liên hệ"}
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
