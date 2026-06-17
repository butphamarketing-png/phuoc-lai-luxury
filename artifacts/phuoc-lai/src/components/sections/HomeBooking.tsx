import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePublishedServices, useSubmitLead } from "@/hooks/useSiteData";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  date: z.string().optional(),
  time: z.string().optional(),
  service: z.string().optional(),
  note: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function HomeBooking() {
  const { t } = useLang();
  const { toast } = useToast();
  const { data: services = [] } = usePublishedServices();
  const submitLead = useSubmitLead();
  const form = useForm<BookingFormValues>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (data: BookingFormValues) => {
    const serviceTitle =
      services.find((s) => s.slug === data.service)?.title ??
      (data.service ? t.nav.servicesDropdown[data.service as keyof typeof t.nav.servicesDropdown] : "") ??
      "Chưa chọn";

    const noteParts = ["[Form booking]"];
    if (data.date) noteParts.push(`Ngày: ${data.date}`);
    if (data.time) noteParts.push(`Giờ: ${data.time}`);
    if (data.note?.trim()) noteParts.push(data.note.trim());

    try {
      await submitLead.mutateAsync({
        name: data.name,
        phone: data.phone,
        serviceInterest: serviceTitle,
        note: noteParts.join(" · "),
        source: "booking",
      });
      toast({
        title: "Đã gửi yêu cầu",
        description: "Phuoc Lai sẽ liên hệ bạn trong thời gian sớm nhất.",
      });
      form.reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Không gửi được",
        description: "Vui lòng thử lại hoặc gọi hotline 0909 203 108.",
      });
    }
  };

  const fieldClass =
    "rounded-none border-0 border-b border-[#1a1a1a]/15 bg-transparent px-0 h-10 text-[13px] font-light text-[#1a1a1a] shadow-none focus-visible:ring-0 focus-visible:border-[#1a1a1a]";

  const serviceOptions =
    services.length > 0
      ? services.map((s) => ({ value: s.slug, label: s.title }))
      : [
          { value: "s1", label: t.nav.servicesDropdown.s1 },
          { value: "s2", label: t.nav.servicesDropdown.s2 },
          { value: "s3", label: t.nav.servicesDropdown.s3 },
          { value: "s4", label: t.nav.servicesDropdown.s4 },
        ];

  return (
    <section className="bg-[#ebebeb]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        <div className="relative hidden lg:block min-h-[640px]">
          <img src="/intro-interior.png" alt="Studio" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <div className="pl-container lg:pl-16 xl:pl-20 py-16 lg:py-20 flex flex-col justify-center">
          <p className="pl-label pl-label-light mb-4">{t.home.booking.label}</p>
          <h2 className="pl-heading-lg text-[#1a1a1a] mb-2">{t.home.booking.title}</h2>
          <p className="text-[13px] font-light text-[#1a1a1a]/55 mb-10">{t.home.booking.desc}</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[480px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-[10px] uppercase tracking-[0.14em] text-[#1a1a1a]/50 font-medium mb-2 block">
                  {t.home.booking.form.name}
                </Label>
                <Input {...form.register("name")} className={fieldClass} />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-[0.14em] text-[#1a1a1a]/50 font-medium mb-2 block">
                  {t.home.booking.form.phone}
                </Label>
                <Input {...form.register("phone")} className={fieldClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-[10px] uppercase tracking-[0.14em] text-[#1a1a1a]/50 font-medium mb-2 block">
                  {t.home.booking.form.date}
                </Label>
                <Input type="date" {...form.register("date")} className={fieldClass} />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-[0.14em] text-[#1a1a1a]/50 font-medium mb-2 block">
                  {t.home.booking.form.time}
                </Label>
                <Select onValueChange={(v) => form.setValue("time", v)}>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent>
                    {["09:00", "10:00", "14:00", "15:00"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-[10px] uppercase tracking-[0.14em] text-[#1a1a1a]/50 font-medium mb-2 block">
                {t.home.booking.form.service}
              </Label>
              <Select onValueChange={(v) => form.setValue("service", v)}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="..." />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[10px] uppercase tracking-[0.14em] text-[#1a1a1a]/50 font-medium mb-2 block">
                {t.home.booking.form.note}
              </Label>
              <Textarea {...form.register("note")} rows={2} className={`${fieldClass} resize-none min-h-[60px]`} />
            </div>

            <Button
              type="submit"
              disabled={submitLead.isPending}
              className="pl-btn-solid w-full sm:w-auto h-auto border-0 mt-2"
            >
              {submitLead.isPending ? "Đang gửi..." : t.home.booking.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
