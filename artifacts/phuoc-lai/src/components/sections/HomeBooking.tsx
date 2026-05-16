import { motion } from "framer-motion";
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

const bookingSchema = z.object({
  name: z.string().min(1, "Bắt buộc"),
  phone: z.string().min(1, "Bắt buộc"),
  date: z.string().min(1, "Bắt buộc"),
  time: z.string().min(1, "Bắt buộc"),
  service: z.string().min(1, "Bắt buộc"),
  note: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function HomeBooking() {
  const { t } = useLang();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log(data);
    form.reset();
  };

  return (
    <section className="bg-[#f5f5f0] border-t border-black/5">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block h-[800px]">
          <img src="/intro-interior.png" alt="Studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-48 h-48 opacity-90 invert" />
          </div>
        </div>

        <div className="p-12 md:p-24 flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#1a1a1a]/50 mb-4 block">
            {t.home.booking.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1a1a1a] leading-tight mb-2">
            {t.home.booking.title}
          </h2>
          <p className="text-sm text-[#1a1a1a]/60 font-light mb-12">
            {t.home.booking.desc}
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">{t.home.booking.form.name}</Label>
                <Input
                  {...form.register("name")}
                  className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">{t.home.booking.form.phone}</Label>
                <Input
                  {...form.register("phone")}
                  className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">{t.home.booking.form.date}</Label>
                <Input
                  type="date"
                  {...form.register("date")}
                  className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">{t.home.booking.form.time}</Label>
                <Select onValueChange={(val) => form.setValue("time", val)}>
                  <SelectTrigger className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus:ring-0 focus:border-black text-[#1a1a1a]">
                    <SelectValue placeholder="..." />
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
              <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">{t.home.booking.form.service}</Label>
              <Select onValueChange={(val) => form.setValue("service", val)}>
                <SelectTrigger className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus:ring-0 focus:border-black text-[#1a1a1a]">
                  <SelectValue placeholder="..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s1">{t.nav.servicesDropdown.s1}</SelectItem>
                  <SelectItem value="s2">{t.nav.servicesDropdown.s2}</SelectItem>
                  <SelectItem value="s3">{t.nav.servicesDropdown.s3}</SelectItem>
                  <SelectItem value="s4">{t.nav.servicesDropdown.s4}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">{t.home.booking.form.note}</Label>
              <Textarea
                {...form.register("note")}
                className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black resize-none text-[#1a1a1a]"
                rows={2}
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-none bg-[#111] text-white hover:bg-black uppercase tracking-widest text-xs h-14 mt-8"
            >
              {t.home.booking.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}