import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContentSection } from "@/data/content-details";
import ImageUploadField from "@/components/admin/ImageUploadField";

type SectionEditorProps = {
  sections: ContentSection[];
  onChange: (sections: ContentSection[]) => void;
};

const emptySection = (): ContentSection => ({
  heading: "",
  content: "",
  list: [],
});

export default function SectionEditor({ sections, onChange }: SectionEditorProps) {
  const update = (index: number, patch: Partial<ContentSection>) => {
    const next = sections.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange(next);
  };

  const updateList = (index: number, raw: string) => {
    const list = raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    update(index, { list: list.length ? list : undefined });
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-black/45">
        Dùng khi muốn bố cục theo từng mục (tiêu đề + đoạn + danh sách). Nếu đã
        nhập nội dung HTML ở tab Nội dung, trang web ưu tiên hiển thị HTML đó.
      </p>
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-black/8 p-4 space-y-3 bg-[#FAFAFA]/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/35">
              Mục {idx + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500/70 hover:text-red-600"
              onClick={() => onChange(sections.filter((_, i) => i !== idx))}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Tiêu đề mục</Label>
            <Input
              value={section.heading}
              onChange={(e) => update(idx, { heading: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Nội dung đoạn văn</Label>
            <Textarea
              rows={4}
              value={section.content ?? ""}
              onChange={(e) => update(idx, { content: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Danh sách (mỗi dòng một ý)</Label>
            <Textarea
              rows={3}
              value={(section.list ?? []).join("\n")}
              onChange={(e) => updateList(idx, e.target.value)}
            />
          </div>
          <ImageUploadField
            label="Ảnh minh họa"
            value={section.image ?? ""}
            onChange={(image) =>
              update(idx, { image: image || undefined })
            }
            folder="sections"
            previewAspect="video"
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full rounded-xl"
        onClick={() => onChange([...sections, emptySection()])}
      >
        <Plus size={16} className="mr-2" />
        Thêm mục nội dung
      </Button>
    </div>
  );
}
