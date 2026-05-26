import { motion } from "framer-motion";
import { HardDrive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStorageUsage } from "@/hooks/use-storage-usage";
import {
  SITE_STORAGE_LIMIT_GB,
  formatStorageSummary,
  formatStorageUsed,
  storageBarColorClass,
  storageBarWidthPercent,
  storageUsagePercent,
} from "@/lib/storage-usage";

export default function AdminStorageUsage() {
  const { data, isLoading, isError } = useStorageUsage();

  const usedBytes = data?.usedBytes ?? 0;
  const limitBytes = data?.limitBytes ?? SITE_STORAGE_LIMIT_GB * 1024 ** 3;
  const percent = storageUsagePercent(usedBytes, limitBytes);
  const barWidth = storageBarWidthPercent(usedBytes, limitBytes);
  const barColor = storageBarColorClass(percent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
    >
      <Card className="rounded-3xl border-black/[0.03] shadow-sm">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-3 rounded-2xl bg-[#FAFAFA] text-black shrink-0">
                <HardDrive size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold mb-1">
                  Dung lượng lưu trữ CMS
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-bold truncate">
                  {isLoading
                    ? "Đang tính…"
                    : isError || !data
                      ? "Không tải được"
                      : formatStorageUsed(usedBytes)}
                </h3>
              </div>
            </div>
            <div className="sm:ml-auto text-left sm:text-right shrink-0">
              <span className="inline-block text-[10px] font-bold text-black/50 bg-black/[0.04] px-3 py-1.5 rounded-lg">
                Gói {SITE_STORAGE_LIMIT_GB} GB
              </span>
              {data && !isError && (
                <p className="text-[10px] text-black/35 mt-2 uppercase tracking-widest">
                  {data.fileCount} tệp trên Supabase
                </p>
              )}
            </div>
          </div>

          <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-black/[0.06] to-black/[0.04] overflow-hidden border border-black/[0.04]">
            {!isLoading && !isError && data && usedBytes > 0 && (
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${barColor}`}
                style={{ width: `${barWidth}%` }}
              />
            )}
            {isLoading && (
              <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-black/10 animate-pulse" />
            )}
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-black/45">
            <span>
              {isLoading
                ? "Đang quét bucket site-media…"
                : isError || !data
                  ? "Chỉ tính file upload qua admin (ảnh/video Supabase)."
                  : formatStorageSummary(usedBytes, limitBytes)}
            </span>
            {data && !isError && (
              <span className="text-black/30 shrink-0">
                {percent < 0.01 && usedBytes > 0
                  ? "< 0.01% đã dùng"
                  : `${percent.toFixed(percent < 1 ? 2 : 1)}% đã dùng`}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
