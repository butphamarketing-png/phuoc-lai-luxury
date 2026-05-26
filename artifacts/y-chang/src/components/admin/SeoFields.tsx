import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { DetailSeo } from "@/data/content-details";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type SeoFieldsProps = {
  value: DetailSeo;
  onChange: (seo: DetailSeo) => void;
  onGenerate?: () => void;
};

function CharCount({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  const over = current > max;
  return (
    <span
      className={cn(
        "text-[10px] tabular-nums",
        over ? "text-red-600 font-medium" : "text-black/40",
      )}
    >
      {current}/{max} ký tự
    </span>
  );
}

export default function SeoFields({ value, onChange, onGenerate }: SeoFieldsProps) {
  const set = (key: keyof DetailSeo, v: string) =>
    onChange({ ...value, [key]: v });

  const title = value.title ?? "";
  const keywords = value.keywords ?? "";
  const description = value.description ?? "";

  return (
    <div className="space-y-5">
      {onGenerate && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-lg text-green-700 border-green-200 bg-green-50 hover:bg-green-100"
          onClick={onGenerate}
        >
          <Sparkles size={14} className="mr-2" />
          Tự tạo SEO
        </Button>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>SEO Title</Label>
          <CharCount current={title.length} max={70} />
        </div>
        <Input
          value={title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Tiêu đề hiển thị trên Google"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>SEO Keywords</Label>
          <CharCount current={keywords.length} max={200} />
        </div>
        <Textarea
          rows={3}
          value={keywords}
          onChange={(e) => set("keywords", e.target.value)}
          placeholder="từ khóa 1, từ khóa 2, …"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>SEO Description</Label>
          <CharCount current={description.length} max={160} />
        </div>
        <Textarea
          rows={4}
          value={description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Mô tả ngắn xuất hiện dưới tiêu đề trên kết quả tìm kiếm"
        />
      </div>
    </div>
  );
}
