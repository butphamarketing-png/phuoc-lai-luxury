import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePublicServices } from "@/hooks/use-site-content";
import { useCustomerMutations } from "@/hooks/use-site-customers";
import logoImg from "@/assets/logo.png";

export default function BookingSection() {
  const { toast } = useToast();
  const { data: services = [] } = usePublicServices();
  const { submitLead } = useCustomerMutations();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    note: "",
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

    const serviceLabel =
      services.find((s) => s.slug === form.service)?.title ?? form.service;

    const parts = ["[Form booking]"];
    if (form.date) parts.push(`Ngày: ${form.date}`);
    if (form.time) parts.push(`Giờ: ${form.time}`);
    if (form.note.trim()) parts.push(form.note.trim());

    try {
      await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        serviceInterest: serviceLabel || "Chưa chọn",
        note: parts.join(" · "),
      });
      toast({
        title: "Đã gửi yêu cầu",
        description: "Phuoc Lai sẽ liên hệ bạn trong thời gian sớm nhất.",
      });
      setForm({ name: "", phone: "", service: "", date: "", time: "", note: "" });
    } catch {
      toast({
        variant: "destructive",
        title: "Không gửi được",
        description: "Vui lòng gọi hotline hoặc thử lại sau.",
      });
    }
  };

  return (
    <section className="bg-background border-t border-border/60" data-testid="section-booking">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-primary min-h-[300px] lg:min-h-0"
          data-testid="container-booking-image"
        >
          <img
            src="/khong-gian.jpg"
            alt="Phuoc Lai studio"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative z-10 h-full p-6 md:p-10"
          >
            <div className="absolute top-5 right-5 md:top-8 md:right-8 flex items-center gap-3 rounded-full bg-background/40 backdrop-blur-md border border-border/40 px-3 py-2">
              <div className="logo-badge logo-shine h-12 w-12 md:h-14 md:w-14">
                <img
                  src={logoImg}
                  alt="LP Logo"
                  className="logo-badge-img h-7 md:h-9"
                  data-testid="img-booking-logo"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none pr-1">
                <span className="text-[11px] md:text-xs font-serif tracking-[0.28em] uppercase text-primary-foreground/90">
                  Phuoc Lai
                </span>
                <span className="text-[8px] md:text-[9px] font-light tracking-[0.55em] uppercase text-primary-foreground/60 mt-1">
                  Luxury
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-background"
          data-testid="container-booking-form"
        >
          <div className="max-w-xl mx-auto w-full rounded-2xl bg-card text-card-foreground p-6 md:p-8 shadow-lg ring-1 ring-border/60">
            <h2
              className="text-3xl md:text-4xl font-serif text-foreground mb-2"
              data-testid="text-booking-title"
            >
              ĐẶT LỊCH TƯ VẤN
            </h2>
            <p
              className="text-lg italic font-serif text-foreground/70 mb-6"
              data-testid="text-booking-subtitle"
            >
              Đẹp tự nhiên – Tự tin tỏa sáng
            </p>
            <p
              className="text-sm text-foreground/60 font-light mb-10"
              data-testid="text-booking-desc"
            >
              Vui lòng để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ để tư vấn dáng mày phù hợp nhất cho bạn.
            </p>

            <form className="space-y-6" data-testid="form-booking" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-background/40 border border-border/80 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="Nhập họ tên"
                    data-testid="input-booking-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </motion.div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-background/40 border border-border/80 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="Nhập SĐT"
                    data-testid="input-booking-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50">
                    Dịch vụ quan tâm
                  </label>
                  <select
                    className="w-full bg-background/40 border border-border/80 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                    data-testid="select-booking-service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="">Chọn dịch vụ</option>
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.slug}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                </motion.div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50">
                    Ngày muốn làm
                  </label>
                  <input
                    type="date"
                    className="w-full bg-background/40 border border-border/80 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                    data-testid="input-booking-date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50">
                    Giờ mong muốn
                  </label>
                  <input
                    type="time"
                    className="w-full bg-background/40 border border-border/80 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                    data-testid="input-booking-time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </motion.div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/50">
                    Ghi chú
                  </label>
                  <textarea
                    className="w-full bg-background/40 border border-border/80 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                    rows={1}
                    placeholder="Nhu cầu đặc biệt..."
                    data-testid="textarea-booking-note"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <Button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-[11px] uppercase tracking-[0.2em] mt-4"
                  data-testid="btn-booking-submit"
                >
                  {submitLead.isPending ? "Đang gửi..." : "ĐẶT LỊCH NGAY →"}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
