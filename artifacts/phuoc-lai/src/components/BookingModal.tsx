import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bookingSchema = z.object({
  name: z.string().min(1, "Bắt buộc"),
  phone: z.string().min(1, "Bắt buộc"),
  date: z.string().optional(),
  time: z.string().optional(),
  service: z.string().optional(),
  note: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const { t } = useLang();
  const { toast } = useToast();
  const { data: services = [] } = usePublishedServices();
  const submitLead = useSubmitLead();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      note: "",
    },
  });

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
      onOpenChange(false);
      form.reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Không gửi được",
        description: "Vui lòng thử lại hoặc gọi hotline 0909 203 108.",
      });
    }
  };

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-[#f5f5f0] border-none rounded-none">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-serif tracking-wider uppercase text-[#1a1a1a]">
            {t.home.booking.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground font-light">
            {t.home.booking.desc}
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider">{t.home.booking.form.name}</Label>
              <Input
                {...form.register("name")}
                className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider">{t.home.booking.form.phone}</Label>
              <Input
                {...form.register("phone")}
                className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black"
                placeholder="+84..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider">{t.home.booking.form.date}</Label>
              <Input
                type="date"
                {...form.register("date")}
                className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider">{t.home.booking.form.time}</Label>
              <Select onValueChange={(val) => form.setValue("time", val)}>
                <SelectTrigger className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus:ring-0 focus:border-black">
                  <SelectValue placeholder="Chọn giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">{t.home.booking.form.service}</Label>
            <Select onValueChange={(val) => form.setValue("service", val)}>
              <SelectTrigger className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus:ring-0 focus:border-black">
                <SelectValue placeholder="Chọn dịch vụ" />
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

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">{t.home.booking.form.note}</Label>
            <Textarea
              {...form.register("note")}
              className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black resize-none"
              rows={3}
              placeholder="..."
            />
          </div>

          <Button
            type="submit"
            disabled={submitLead.isPending}
            className="w-full rounded-none bg-[#111] text-white hover:bg-black uppercase tracking-widest text-xs h-12 mt-6"
          >
            {submitLead.isPending ? "Đang gửi..." : t.home.booking.form.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
