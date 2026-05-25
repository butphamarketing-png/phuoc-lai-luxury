import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type DetailContentDialogProps<T extends object> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initial: T | null;
  onSave: (value: T) => Promise<void>;
  saving?: boolean;
  fields: {
    key: keyof T & string;
    label: string;
    type?: "text" | "textarea";
    rows?: number;
  }[];
};

export default function DetailContentDialog<T extends object>({
  open,
  onOpenChange,
  title,
  initial,
  onSave,
  saving,
  fields,
}: DetailContentDialogProps<T>) {
  const [draft, setDraft] = useState<T | null>(null);

  useEffect(() => {
    if (open && initial) setDraft({ ...initial });
  }, [open, initial]);

  if (!draft) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  rows={field.rows ?? 4}
                  value={String(draft[field.key] ?? "")}
                  onChange={(e) =>
                    setDraft({ ...draft, [field.key]: e.target.value })
                  }
                />
              ) : (
                <Input
                  value={String(draft[field.key] ?? "")}
                  onChange={(e) =>
                    setDraft({ ...draft, [field.key]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
          <Button
            className="w-full rounded-xl bg-[#1A1A1A]"
            disabled={saving}
            onClick={() => onSave(draft)}
          >
            Lưu nội dung chi tiết
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
