import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { t } = useLanguage();

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

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">{t("contact.name")}</label>
              <Input className="rounded-none border-b border-white/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-white h-12 text-lg" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">{t("contact.phone")}</label>
              <Input type="tel" className="rounded-none border-b border-white/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-white h-12 text-lg" required />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">{t("contact.service")}</label>
              <select className="w-full rounded-none border-b border-white/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 py-3 text-lg focus:ring-0 focus:outline-none appearance-none text-white/90">
                <option value="" className="bg-[#0a0a0a]">Select...</option>
                <option value="brows" className="bg-[#0a0a0a]">Điêu Khắc Sợi / Brows</option>
                <option value="lips" className="bg-[#0a0a0a]">Phun Môi / Lips</option>
                <option value="ombre" className="bg-[#0a0a0a]">Ombre Brows</option>
                <option value="correction" className="bg-[#0a0a0a]">Xử Lý Mày Cũ / Correction</option>
              </select>
            </div>

            <div className="space-y-2 pt-4">
              <Button type="submit" className="w-full rounded-none bg-white text-black hover:bg-white/90 h-14 text-sm uppercase tracking-[0.2em] font-medium transition-all">
                {t("contact.submit")}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
