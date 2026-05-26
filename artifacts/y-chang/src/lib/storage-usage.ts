import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

const BUCKET = "site-media";

/** Gói lưu trữ media CMS (giới thiệu) */
export const SITE_STORAGE_LIMIT_GB = 3;
export const SITE_STORAGE_LIMIT_BYTES = SITE_STORAGE_LIMIT_GB * 1024 ** 3;

export type StorageUsage = {
  usedBytes: number;
  limitBytes: number;
  fileCount: number;
};

function formatStorageSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) {
    const kb = bytes / 1024;
    return kb >= 100 ? `${Math.round(kb)} KB` : `${kb.toFixed(1)} KB`;
  }
  if (bytes < 1024 ** 3) {
    const mb = bytes / 1024 ** 2;
    return mb >= 100 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`;
  }
  const gb = bytes / 1024 ** 3;
  return gb >= 10 ? `${gb.toFixed(1)} GB` : `${gb.toFixed(2)} GB`;
}

export function formatStorageUsed(bytes: number): string {
  return formatStorageSize(bytes);
}

export function formatStorageRemaining(usedBytes: number, limitBytes: number): string {
  const left = Math.max(0, limitBytes - usedBytes);
  if (left >= 1024 ** 3) return `còn ${(left / 1024 ** 3).toFixed(1)} GB`;
  if (left >= 1024 ** 2) return `còn ${Math.round(left / 1024 ** 2)} MB`;
  return `còn ${formatStorageSize(left)}`;
}

export function storageUsagePercent(usedBytes: number, limitBytes: number): number {
  if (limitBytes <= 0) return 0;
  return Math.min(100, Math.round((usedBytes / limitBytes) * 100));
}

async function sumFolder(prefix: string): Promise<{ bytes: number; files: number }> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) throw error;
  if (!data?.length) return { bytes: 0, files: 0 };

  let bytes = 0;
  let files = 0;

  for (const item of data) {
    const path = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.id == null) {
      const nested = await sumFolder(path);
      bytes += nested.bytes;
      files += nested.files;
    } else {
      const size =
        (item.metadata as { size?: number } | undefined)?.size ??
        (item as { size?: number }).size ??
        0;
      bytes += size;
      files += 1;
    }
  }

  return { bytes, files };
}

/** Tổng dung lượng bucket site-media (cần đăng nhập admin). */
export async function fetchSiteStorageUsage(): Promise<StorageUsage> {
  if (!isSupabaseConfigured()) {
    return {
      usedBytes: 0,
      limitBytes: SITE_STORAGE_LIMIT_BYTES,
      fileCount: 0,
    };
  }

  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Vui lòng đăng nhập admin.");
  }

  const { bytes, files } = await sumFolder("");
  return {
    usedBytes: bytes,
    limitBytes: SITE_STORAGE_LIMIT_BYTES,
    fileCount: files,
  };
}
