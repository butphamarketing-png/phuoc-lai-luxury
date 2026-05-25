import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SeoFields from "@/components/admin/SeoFields";
import SectionEditor from "@/components/admin/SectionEditor";
import type {
  ContentSection,
  DetailSeo,
  ServiceDetailContent,
  TrainingDetailContent,
} from "@/data/content-details";
import { getSiteUrl } from "@/lib/seo";

type BaseDetail = {
  title: string;
  intro: string;
  image?: string;
  metaDescription?: string;
  bodyHtml?: string;
  seo?: DetailSeo;
  sections: ContentSection[];
};

type InfoField = {
  key: string;
  label: string;
  type?: "text" | "textarea";
  rows?: number;
};

type ArticleContentEditorProps<T extends BaseDetail> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  slug?: string;
  publicPathPrefix?: string;
  initial: T | null;
  onSave: (value: T) => Promise<void>;
  saving?: boolean;
  infoFields: InfoField[];
  extraTab?: React.ReactNode;
};

export default function ArticleContentEditor<T extends BaseDetail>({
  open,
  onOpenChange,
  title,
  slug,
  publicPathPrefix,
  initial,
  onSave,
  saving,
  infoFields,
  extraTab,
}: ArticleContentEditorProps<T>) {
  const [draft, setDraft] = useState<T | null>(null);
  const [tab, setTab] = useState("content");

  useEffect(() => {
    if (open && initial) {
      setDraft({
        ...initial,
        seo: initial.seo ?? {},
        sections: initial.sections ?? [],
      });
      setTab("content");
    }
  }, [open, initial]);

  if (!draft) return null;

  const publicUrl =
    slug && publicPathPrefix
      ? `${getSiteUrl()}${publicPathPrefix}${slug}`
      : null;

  const generateSeo = () => {
    const meta = draft.metaDescription || draft.intro;
    setDraft({
      ...draft,
      seo: {
        title: (draft.seo?.title || draft.title).slice(0, 70),
        description: (draft.seo?.description || meta).slice(0, 160),
        keywords: draft.seo?.keywords || draft.title,
      },
    });
  };

  const patch = (partial: Partial<T>) => setDraft({ ...draft, ...partial });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] max-w-4xl max-h-[92vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
          <DialogTitle className="font-serif text-xl pr-8">{title}</DialogTitle>
          {publicUrl && (
            <p className="text-[11px] text-black/40 truncate">
              Xem trên web:{" "}
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-black"
              >
                {publicUrl}
              </a>
            </p>
          )}
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="flex flex-col flex-1 min-h-0">
          <TabsList className="mx-6 mb-0 w-auto justify-start rounded-xl bg-black/[0.04] p-1">
            <TabsTrigger value="info" className="rounded-lg text-xs">
              Thông tin
            </TabsTrigger>
            <TabsTrigger value="content" className="rounded-lg text-xs">
              Nội dung
            </TabsTrigger>
            <TabsTrigger value="sections" className="rounded-lg text-xs">
              Mục chi tiết
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-lg text-xs">
              SEO
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
            <TabsContent value="info" className="mt-0 space-y-4">
              {infoFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      rows={field.rows ?? 4}
                      value={String(
                        (draft as Record<string, unknown>)[field.key] ?? "",
                      )}
                      onChange={(e) =>
                        patch({
                          [field.key]: e.target.value,
                        } as Partial<T>)
                      }
                    />
                  ) : (
                    <Input
                      value={String(
                        (draft as Record<string, unknown>)[field.key] ?? "",
                      )}
                      onChange={(e) =>
                        patch({
                          [field.key]: e.target.value,
                        } as Partial<T>)
                      }
                    />
                  )}
                </div>
              ))}
              {extraTab}
              {"curriculum" in draft && Array.isArray(draft.curriculum) && (
                <div className="space-y-2">
                  <Label>Chương trình (mỗi dòng một mục)</Label>
                  <Textarea
                    rows={5}
                    value={(draft.curriculum as string[]).join("\n")}
                    onChange={(e) => {
                      const curriculum = e.target.value
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean);
                      patch({ curriculum } as unknown as Partial<T>);
                    }}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="content" className="mt-0 space-y-5">
              {"image" in draft && (
                <ImageUploadField
                  label="Ảnh bìa trang chi tiết"
                  value={String(draft.image ?? "")}
                  onChange={(image) => patch({ image } as Partial<T>)}
                  folder="covers"
                  hint="Khuyến nghị 1200×630 px — JPG/PNG tối đa 5MB"
                />
              )}
              <div className="space-y-2">
                <Label>Tiêu đề (hiển thị trang chi tiết)</Label>
                <Input
                  value={draft.title}
                  onChange={(e) => patch({ title: e.target.value } as Partial<T>)}
                />
              </div>
              <div className="space-y-2">
                <Label>Mô tả ngắn</Label>
                <Textarea
                  rows={3}
                  value={draft.metaDescription ?? ""}
                  onChange={(e) =>
                    patch({ metaDescription: e.target.value } as Partial<T>)
                  }
                  placeholder="Tóm tắt 1–2 câu (dùng cho SEO / danh sách)"
                />
              </div>
              <div className="space-y-2">
                <Label>Đoạn mở đầu</Label>
                <Textarea
                  rows={4}
                  value={draft.intro}
                  onChange={(e) => patch({ intro: e.target.value } as Partial<T>)}
                />
              </div>
              <div className="space-y-2">
                <Label>Nội dung bài viết</Label>
                <RichTextEditor
                  value={draft.bodyHtml ?? ""}
                  onChange={(bodyHtml) => patch({ bodyHtml } as Partial<T>)}
                  uploadFolder="articles"
                />
              </div>
            </TabsContent>

            <TabsContent value="sections" className="mt-0">
              <SectionEditor
                sections={draft.sections}
                onChange={(sections) => patch({ sections } as Partial<T>)}
              />
            </TabsContent>

            <TabsContent value="seo" className="mt-0">
              <SeoFields
                value={draft.seo ?? {}}
                onChange={(seo) => patch({ seo } as Partial<T>)}
                onGenerate={generateSeo}
              />
            </TabsContent>
          </div>
        </Tabs>

        <div className="shrink-0 border-t border-black/5 px-6 py-4 flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Thoát
          </Button>
          <Button
            className="flex-1 rounded-xl bg-[#1A1A1A]"
            disabled={saving}
            onClick={() => onSave(draft)}
          >
            Lưu & đăng lên website
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type { ServiceDetailContent, TrainingDetailContent };
