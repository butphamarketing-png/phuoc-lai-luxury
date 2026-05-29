import { useMemo, useState } from "react";
import { Globe, Play, X, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { usePublicServices } from "@/hooks/use-site-content";
import { collectServiceVideos, type ServiceVideoItem } from "@/lib/extract-service-videos";
import { getPublicServicePath } from "@/data/catalog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function VideoPlayer({ item }: { item: ServiceVideoItem }) {
  if (item.type === "youtube" && item.embedUrl) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video">
        <iframe
          src={item.embedUrl}
          title={item.serviceTitle}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video">
      <video
        key={item.src}
        src={item.src}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default function ServiceVideosFab() {
  const { data: services = [], isLoading } = usePublicServices();
  const videos = useMemo(() => collectServiceVideos(services), [services]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ServiceVideoItem | null>(null);

  const openModal = () => {
    setActive(videos[0] ?? null);
    setOpen(true);
  };

  if (!isLoading && videos.length === 0) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        disabled={isLoading || videos.length === 0}
        className="fixed bottom-28 right-8 z-[9998] h-14 w-14 bg-card text-foreground border border-border/60 rounded-full flex items-center justify-center shadow-2xl luxury-shadow hover:scale-110 transition-transform disabled:opacity-40"
        aria-label="Xem video dịch vụ"
        title="Video dịch vụ"
      >
        <Globe size={24} className="text-gold" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 rounded-3xl">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/60 shrink-0">
            <DialogTitle className="font-serif text-2xl pr-8">
              Video dịch vụ
            </DialogTitle>
            <p className="text-sm text-foreground/50 font-light">
              {videos.length} video từ các bài dịch vụ đã đăng
            </p>
          </DialogHeader>

          <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
            {active && (
              <div className="px-6 pt-4 pb-2 shrink-0 border-b border-border/40 bg-muted/30">
                <VideoPlayer item={active} />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{active.serviceTitle}</p>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/40">
                      {active.type === "youtube" ? "YouTube" : "Video thực tế"}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="rounded-full text-[10px] uppercase tracking-wider">
                    <Link href={getPublicServicePath(active.serviceSlug)} onClick={() => setOpen(false)}>
                      Xem bài viết
                      <ExternalLink size={12} className="ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            <ul className="overflow-y-auto flex-1 px-4 py-4 space-y-2">
              {videos.map((item) => {
                const isActive = active?.id === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActive(item)}
                      className={`w-full flex items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all ${
                        isActive
                          ? "border-gold/50 bg-gold/5 shadow-sm"
                          : "border-border/60 hover:border-gold/30 hover:bg-muted/40"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isActive ? "bg-gold text-white" : "bg-primary/10 text-gold"
                        }`}
                      >
                        <Play size={16} className={isActive ? "fill-white" : ""} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{item.serviceTitle}</p>
                        <p className="text-[10px] uppercase tracking-wider text-foreground/40">
                          {item.type === "youtube" ? "YouTube" : "Video file"}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
