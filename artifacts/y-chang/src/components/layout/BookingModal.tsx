import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { useCustomerMutations } from "@/hooks/use-site-customers";

const serviceOptions = [
  { value: "", label: "Select..." },
  { value: "brows", label: "Điêu Khắc Sợi / Brows" },
  { value: "lips", label: "Phun Môi / Lips" },
  { value: "ombre", label: "Ombre Brows" },
  { value: "correction", label: "Xử Lý Mày Cũ / Correction" },
  { value: "training", label: "Khóa học đào tạo" },
];

export default function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { submitLead } = useCustomerMutations();
  const [form, setForm] = useState({ name: "", phone: "", service: "", note: "" });

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
      serviceOptions.find((o) => o.value === form.service)?.label ?? form.service;

    try {
      await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        serviceInterest: serviceLabel || "Đặt lịch (popup)",
        note: form.note
          ? `[Đặt lịch popup] ${form.note}`
          : "[Đặt lịch popup]",
      });
      toast({
        title: "Đã gửi yêu cầu đặt lịch",
        description: "Chúng tôi sẽ liên hệ bạn sớm nhất.",
      });
      setForm({ name: "", phone: "", service: "", note: "" });
      onClose();
    } catch {
      toast({
        variant: "destructive",
        title: "Không gửi được",
        description: "Vui lòng gọi hotline hoặc thử lại.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#0a0a0a] border-white/10 text-white rounded-none p-0">
        <div className="p-8 md:p-12">
          <DialogHeader className="mb-8">
            <DialogTitle className="font-serif text-3xl md:text-4xl text-white font-medium tracking-wide">
              {t("booking.title")}
            </DialogTitle>
            <DialogDescription className="text-white/50 font-light mt-2">
              {t("booking.desc")}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">
                {t("contact.name")}
              </label>
              <Input
                className="rounded-none border-b border-white/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-white h-12 text-lg text-white"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">
                {t("contact.phone")}
              </label>
              <Input
                type="tel"
                className="rounded-none border-b border-white/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-white h-12 text-lg text-white"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">
                {t("contact.service")}
              </label>
              <select
                className="w-full rounded-none border-b border-white/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 py-3 text-lg focus:ring-0 focus:outline-none appearance-none text-white/90"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              >
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#0a0a0a]">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">
                Ghi chú
              </label>
              <Textarea
                className="rounded-none border border-white/20 bg-transparent text-white min-h-[80px] focus-visible:ring-0"
                placeholder="Ngày giờ mong muốn..."
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            <div className="space-y-2 pt-4">
              <Button
                type="submit"
                disabled={submitLead.isPending}
                className="w-full rounded-none bg-white text-black hover:bg-white/90 h-14 text-sm uppercase tracking-[0.2em] font-medium transition-all"
              >
                {submitLead.isPending ? "Đang gửi..." : t("contact.submit")}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
