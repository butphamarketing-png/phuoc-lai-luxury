import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings, useSettingsMutations } from "@/hooks/use-site-settings";
import {
  DEFAULT_SITE_SETTINGS,
  type SiteSettings,
} from "@/lib/site-settings";

export default function AdminSettings() {
  const { toast } = useToast();
  const { data, isLoading } = useSiteSettings();
  const saveSettings = useSettingsMutations();
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const update = (key: keyof SiteSettings, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      await saveSettings.mutateAsync(form);
      toast({
        title: "Đã lưu cài đặt",
        description: "Thông tin liên hệ trên website đã cập nhật.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Lỗi lưu",
        description: "Chạy supabase/cms-extensions.sql trong SQL Editor.",
      });
    }
  };

  const fields: { key: keyof SiteSettings; label: string; placeholder?: string }[] = [
    { key: "siteName", label: "Tên thương hiệu" },
    { key: "phoneDisplay", label: "Số điện thoại (hiển thị)", placeholder: "0909 203 108" },
    { key: "phone", label: "Số gọi (tel:)", placeholder: "+84909203108" },
    { key: "email", label: "Email" },
    { key: "address", label: "Địa chỉ" },
    { key: "hours", label: "Giờ mở cửa" },
    { key: "facebook", label: "Facebook URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "zalo", label: "Zalo URL" },
    { key: "messenger", label: "Messenger URL" },
  ];

  return (
    <AdminLayout title="Cài đặt website">
      <div className="space-y-8 max-w-2xl">
        <AdminPageHeader
          title="Cài đặt chung"
          description="Hotline, địa chỉ và mạng xã hội dùng trên trang Liên hệ và chân trang."
        />

        <div className="bg-white rounded-[2rem] border border-black/[0.03] shadow-sm p-8 space-y-6">
          {isLoading ? (
            <p className="text-black/40 text-sm">Đang tải...</p>
          ) : (
            <>
              {fields.map(({ key, label, placeholder }) => (
                <div key={key} className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-black/50">
                    {label}
                  </Label>
                  <Input
                    value={form[key] ?? ""}
                    onChange={(e) => update(key, e.target.value)}
                    placeholder={placeholder}
                    className="rounded-xl"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-black/50">
                  Ghi chú đặt lịch (tùy chọn)
                </Label>
                <Textarea
                  rows={3}
                  value={form.bookingNote ?? ""}
                  onChange={(e) => update("bookingNote", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <Button
                className="rounded-2xl bg-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold w-full sm:w-auto"
                onClick={handleSave}
                disabled={saveSettings.isPending}
              >
                Lưu cài đặt
              </Button>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
