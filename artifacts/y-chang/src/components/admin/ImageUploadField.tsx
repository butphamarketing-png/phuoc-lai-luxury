import { useCallback, useRef, useState } from "react";
import { CloudUpload, Loader2, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  canUploadImages,
  uploadSiteImage,
  validateImageFile,
} from "@/lib/media-upload";
import { useToast } from "@/hooks/use-toast";

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  hint?: string;
  previewAspect?: "video" | "square";
  className?: string;
};

export default function ImageUploadField({
  label = "Hình ảnh",
  value,
  onChange,
  folder = "uploads",
  hint = "JPG, PNG, WebP, GIF — tối đa 5MB",
  previewAspect = "video",
  className,
}: ImageUploadFieldProps) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      const validation = validateImageFile(file);
      if (validation) {
        toast({ variant: "destructive", title: validation });
        return;
      }

      if (!canUploadImages()) {
        toast({
          variant: "destructive",
          title: "Chưa bật upload",
          description:
            "Cấu hình Supabase hoặc dán đường dẫn ảnh có sẵn trên website (vd. /service-brows.png).",
        });
        return;
      }

      setUploading(true);
      try {
        const { url } = await uploadSiteImage(file, folder);
        onChange(url);
        toast({ title: "Đã tải ảnh lên" });
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Lỗi tải ảnh",
          description: e instanceof Error ? e.message : "Thử lại sau.",
        });
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange, toast],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) void uploadFile(file);
  };

  const previewSrc = value?.startsWith("http") || value?.startsWith("/") ? value : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>

      {previewSrc && (
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-black/8 bg-[#FAFAFA]",
            previewAspect === "video" ? "aspect-video max-h-48" : "aspect-square max-h-40 w-40",
          )}
        >
          <img
            src={previewSrc}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 cursor-pointer transition-colors",
          dragOver
            ? "border-black/30 bg-black/[0.03]"
            : "border-black/10 hover:border-black/20 hover:bg-[#FAFAFA]",
          uploading && "pointer-events-none opacity-60",
        )}
      >
        {uploading ? (
          <Loader2 size={28} className="animate-spin text-black/30" />
        ) : (
          <CloudUpload size={28} className="text-black/25" />
        )}
        <p className="text-center text-sm text-black/55">
          Kéo và thả hình vào đây hoặc{" "}
          <span className="font-medium text-black underline">Chọn hình</span>
        </p>
        <p className="text-[10px] text-black/35 text-center">{hint}</p>
        {!canUploadImages() && (
          <p className="text-[10px] text-amber-700/80 text-center max-w-xs">
            Upload cần Supabase — hoặc nhập đường dẫn bên dưới.
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadFile(file);
          e.target.value = "";
        }}
      />

      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/30">
        <ImageIcon size={12} />
        Đường dẫn / URL
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/service-brows.png hoặc URL sau khi upload"
      />
    </div>
  );
}
