import { useState, useMemo } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiFacebook, SiInstagram, SiMessenger, SiZalo } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { usePublicServices, usePublicTraining } from "@/hooks/use-site-content";
import { useCustomerMutations } from "@/hooks/use-site-customers";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function Contact() {
  const { toast } = useToast();
  const { data: settings = DEFAULT_SITE_SETTINGS } = useSiteSettings();
  const { data: services = [] } = usePublicServices();
  const { data: training = [] } = usePublicTraining();
  const { submitLead } = useCustomerMutations();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    note: "",
  });

  const serviceOptions = useMemo(
    () => [
      { value: "", label: "Chọn dịch vụ / khóa học..." },
      ...services.map((s) => ({ value: `svc:${s.slug}`, label: s.title })),
      ...training.map((t) => ({
        value: `tr:${t.slug}`,
        label: `[Đào tạo] ${t.title}`,
      })),
    ],
    [services, training],
  );

  const socials = [
    { name: "Facebook", icon: SiFacebook, href: settings.facebook },
    { name: "Zalo", icon: SiZalo, href: settings.zalo },
    { name: "Instagram", icon: SiInstagram, href: settings.instagram },
    { name: "Messenger", icon: SiMessenger, href: settings.messenger },
  ].filter((s) => s.href);

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
        serviceInterest: serviceLabel,
        note: form.note ? `[Form liên hệ] ${form.note}` : "[Form liên hệ]",
      });
      toast({
        title: "Đã gửi yêu cầu",
        description: "Phuoc Lai sẽ liên hệ bạn trong thời gian sớm nhất.",
      });
      setForm({ name: "", phone: "", service: "", note: "" });
    } catch {
      toast({
        variant: "destructive",
        title: "Không gửi được",
        description: "Vui lòng gọi hotline hoặc thử lại sau.",
      });
    }
  };

  return (
    <div className="pt-24 pb-0 bg-background text-foreground">
      <section className="py-20 px-6 mt-8">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4 block">
            BOOKING
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground tracking-tight mb-6">
            Đặt Lịch Hẹn
          </h1>
          <p className="text-foreground/70 font-light text-lg">
            Hãy chia sẻ với chúng tôi mong muốn của bạn. Phuoc Lai sẽ liên hệ lại trong thời gian
            sớm nhất để sắp xếp lịch hẹn phù hợp.
          </p>
        </FadeIn>
      </section>

      <section className="py-12 pb-24 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/5">
            <FadeIn direction="right">
              <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border/60">
                <h2 className="text-3xl font-serif tracking-tight mb-8 text-foreground">
                  Gửi Yêu Cầu
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">
                        Họ và tên *
                      </label>
                      <Input
                        className="rounded-xl border-border/80 bg-transparent h-12 focus-visible:ring-primary"
                        placeholder="Nguyễn Văn A"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">
                        Số điện thoại *
                      </label>
                      <Input
                        className="rounded-xl border-border/80 bg-transparent h-12 focus-visible:ring-primary"
                        type="tel"
                        placeholder="0909..."
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Dịch vụ quan tâm
                    </label>
                    <select
                      className="flex h-12 w-full rounded-xl border border-border/80 bg-transparent px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      {serviceOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Ghi chú thêm
                    </label>
                    <Textarea
                      className="rounded-xl border-border/80 bg-transparent min-h-[150px] focus-visible:ring-primary"
                      placeholder="Ngày giờ bạn mong muốn, hoặc các thắc mắc khác..."
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitLead.isPending}
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-sm uppercase tracking-[0.2em] w-full transition-all"
                  >
                    {submitLead.isPending ? "Đang gửi..." : "Gửi Thông Tin"}
                  </Button>
                </form>
              </div>
            </FadeIn>
          </div>

          <div className="lg:w-2/5">
            <FadeIn direction="left" delay={0.2} className="h-full">
              <div className="bg-primary rounded-3xl p-10 shadow-sm text-primary-foreground h-full">
                <h2 className="text-3xl font-serif tracking-tight mb-10 text-white">
                  Thông Tin Liên Hệ
                </h2>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Địa chỉ Studio</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        {settings.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Điện thoại</h4>
                      <a
                        href={`tel:${settings.phone.replace(/\s/g, "")}`}
                        className="text-white/60 font-light text-sm hover:text-white"
                      >
                        {settings.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Email</h4>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-white/60 font-light text-sm hover:text-white"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Giờ làm việc</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        {settings.hours}
                        {settings.bookingNote && (
                          <span className="text-white/90 font-medium italic mt-2 block">
                            {settings.bookingNote}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {socials.length > 0 && (
                  <div className="mt-10 border-t border-white/10 pt-8">
                    <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-white/55">
                      Theo dõi & liên hệ nhanh
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {socials.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white hover:text-black"
                        >
                          <social.icon size={16} />
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
