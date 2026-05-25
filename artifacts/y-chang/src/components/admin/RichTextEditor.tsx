import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Heading2,
  Heading3,
  RemoveFormatting,
  Code,
  Youtube,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { uploadSiteImage, validateImageFile, canUploadImages } from "@/lib/media-upload";
import { useToast } from "@/hooks/use-toast";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  uploadFolder?: string;
};

function ToolbarButton({
  onClick,
  title,
  active,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-md text-black/60 hover:text-black hover:bg-black/5",
        active && "bg-black/10 text-black",
      )}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
    >
      {children}
    </Button>
  );
}

function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m = u.pathname.match(/\/embed\/([^/]+)/);
      if (m) return m[1];
    }
  } catch {
    if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  }
  return null;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung bài viết…",
  className,
  uploadFolder = "editor",
}: RichTextEditorProps) {
  const { toast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const lastHtml = useRef(value);
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState(value);
  const [uploading, setUploading] = useState(false);

  const syncFromDom = useCallback(() => {
    const html = editorRef.current?.innerHTML ?? "";
    if (html !== lastHtml.current) {
      lastHtml.current = html;
      onChange(html);
    }
  }, [onChange]);

  useEffect(() => {
    if (sourceMode) return;
    const el = editorRef.current;
    if (!el) return;
    if (value !== lastHtml.current) {
      el.innerHTML = value || "";
      lastHtml.current = value;
    }
  }, [value, sourceMode]);

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    syncFromDom();
  };

  const insertHtml = (html: string) => {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
    syncFromDom();
  };

  const insertLink = () => {
    const url = window.prompt("Đường dẫn (URL):", "https://");
    if (url) exec("createLink", url);
  };

  const insertImageUrl = (url: string) => {
    insertHtml(
      `<img src="${url.replace(/"/g, "&quot;")}" alt="" style="max-width:100%;border-radius:12px;margin:1rem 0;" />`,
    );
  };

  const insertImage = () => {
    if (canUploadImages()) {
      fileRef.current?.click();
      return;
    }
    const url = window.prompt("Đường dẫn ảnh:", "/");
    if (url) insertImageUrl(url);
  };

  const handleImageFile = async (file: File) => {
    const err = validateImageFile(file);
    if (err) {
      toast({ variant: "destructive", title: err });
      return;
    }
    setUploading(true);
    try {
      const { url } = await uploadSiteImage(file, uploadFolder);
      insertImageUrl(url);
      toast({ title: "Đã chèn ảnh" });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Lỗi tải ảnh",
        description: e instanceof Error ? e.message : undefined,
      });
    } finally {
      setUploading(false);
    }
  };

  const insertYoutube = () => {
    const raw = window.prompt(
      "Dán link YouTube hoặc mã video:",
      "https://www.youtube.com/watch?v=",
    );
    if (!raw) return;
    const id = extractYoutubeId(raw);
    if (!id) {
      toast({ variant: "destructive", title: "Link YouTube không hợp lệ" });
      return;
    }
    insertHtml(
      `<div class="my-8 aspect-video max-w-full overflow-hidden rounded-2xl" style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen loading="lazy"></iframe></div><p><br></p>`,
    );
  };

  const insertTable = () => {
    insertHtml(
      `<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;"><tbody><tr><td style="border:1px solid #e5e5e5;padding:12px;">&nbsp;</td><td style="border:1px solid #e5e5e5;padding:12px;">&nbsp;</td></tr><tr><td style="border:1px solid #e5e5e5;padding:12px;">&nbsp;</td><td style="border:1px solid #e5e5e5;padding:12px;">&nbsp;</td></tr></tbody></table><p><br></p>`,
    );
  };

  const toggleSource = () => {
    if (!sourceMode) {
      setSourceHtml(lastHtml.current || value);
      setSourceMode(true);
    } else {
      lastHtml.current = sourceHtml;
      onChange(sourceHtml);
      if (editorRef.current) editorRef.current.innerHTML = sourceHtml;
      setSourceMode(false);
    }
  };

  const isEmpty =
    !value ||
    value === "<br>" ||
    value.replace(/<[^>]+>/g, "").trim() === "";

  return (
    <div className={cn("rounded-xl border border-black/10 overflow-hidden", className)}>
      <div className="flex flex-wrap items-center gap-0.5 border-b border-black/5 bg-[#FAFAFA] px-2 py-1.5">
        <ToolbarButton onClick={() => exec("bold")} title="In đậm">
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} title="In nghiêng">
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} title="Gạch chân">
          <Underline size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("strikeThrough")} title="Gạch ngang">
          <Strikethrough size={15} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <ToolbarButton onClick={() => exec("formatBlock", "h2")} title="Tiêu đề H2">
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "h3")} title="Tiêu đề H3">
          <Heading3 size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Danh sách">
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertOrderedList")} title="Danh sách số">
          <ListOrdered size={15} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <ToolbarButton onClick={() => exec("justifyLeft")} title="Căn trái">
          <AlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyCenter")} title="Căn giữa">
          <AlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyRight")} title="Căn phải">
          <AlignRight size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyFull")} title="Căn đều">
          <AlignJustify size={15} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <ToolbarButton onClick={insertLink} title="Chèn liên kết">
          <Link2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={insertImage}
          title={uploading ? "Đang tải…" : "Chèn ảnh (upload hoặc URL)"}
        >
          <ImageIcon size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={insertYoutube} title="Chèn YouTube">
          <Youtube size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={insertTable} title="Chèn bảng 2×2">
          <Table size={15} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <ToolbarButton onClick={() => exec("removeFormat")} title="Xóa định dạng">
          <RemoveFormatting size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={toggleSource}
          title="Mã HTML"
          active={sourceMode}
        >
          <Code size={15} />
        </ToolbarButton>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleImageFile(f);
          e.target.value = "";
        }}
      />

      {sourceMode ? (
        <Textarea
          className="min-h-[320px] rounded-none border-0 font-mono text-xs resize-y"
          value={sourceHtml}
          onChange={(e) => {
            setSourceHtml(e.target.value);
            lastHtml.current = e.target.value;
            onChange(e.target.value);
          }}
          placeholder="<p>Nội dung HTML…</p>"
        />
      ) : (
        <div className="relative min-h-[320px] bg-white">
          {isEmpty && (
            <p className="pointer-events-none absolute left-4 top-4 text-sm text-black/30">
              {placeholder}
            </p>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="prose prose-neutral max-w-none min-h-[320px] px-4 py-4 text-base leading-relaxed outline-none focus:ring-0 [&_img]:max-w-full [&_img]:rounded-lg [&_table]:w-full [&_iframe]:max-w-full"
            onInput={syncFromDom}
            onBlur={syncFromDom}
          />
        </div>
      )}
    </div>
  );
}
