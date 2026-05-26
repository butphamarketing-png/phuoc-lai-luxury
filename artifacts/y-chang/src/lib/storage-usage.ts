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

export function formatStorageFree(usedBytes: number, limitBytes: number): string {
  const left = Math.max(0, limitBytes - usedBytes);
  return formatStorageSize(left);
}

export function formatStorageSummary(usedBytes: number, limitBytes: number): string {
  return `${formatStorageUsed(usedBytes)} đã dùng · Còn trống ${formatStorageFree(usedBytes, limitBytes)} (gói ${SITE_STORAGE_LIMIT_GB} GB)`;
}

export function storageUsagePercent(usedBytes: number, limitBytes: number): number {
  if (limitBytes <= 0) return 0;
  return Math.min(100, (usedBytes / limitBytes) * 100);
}

/** % tối thiểu để thanh vẫn thấy khi dung lượng rất nhỏ */
export function storageBarWidthPercent(usedBytes: number, limitBytes: number): number {
  const raw = storageUsagePercent(usedBytes, limitBytes);
  if (usedBytes <= 0) return 0;
  return Math.max(raw, 0.8);
}

export function storageBarColorClass(percent: number): string {
  if (percent >= 90) return "bg-red-500";
  if (percent >= 75) return "bg-amber-500";
  return "bg-blue-500";
}

type ListedItem = {
  name: string;
  id: string | null;
  metadata?: Record<string, unknown> | null;
};

function isFolder(item: ListedItem): boolean {
  return item.id == null;
}

function readMetaSize(item: ListedItem): number {
  const meta = item.metadata as { size?: number } | null | undefined;
  if (typeof meta?.size === "number" && meta.size > 0) return meta.size;
  return 0;
}

async function listPage(prefix: string, offset: number) {
  const supabase = getSupabaseClient();
  return supabase.storage.from(BUCKET).list(prefix, {
    limit: 1000,
    offset,
    sortBy: { column: "name", order: "asc" },
  });
}

async function resolveFileSize(path: string, item: ListedItem): Promise<number> {
  const metaSize = readMetaSize(item);
  if (metaSize > 0) return metaSize;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.storage.from(BUCKET).download(path);
  if (error || !data) return metaSize;
  return data.size;
}

async function sumFolder(prefix: string): Promise<{ bytes: number; files: number }> {
  let bytes = 0;
  let files = 0;
  let offset = 0;

  while (true) {
    const { data, error } = await listPage(prefix, offset);
    if (error) throw error;
    if (!data?.length) break;

    for (const item of data as ListedItem[]) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (isFolder(item)) {
        const nested = await sumFolder(path);
        bytes += nested.bytes;
        files += nested.files;
      } else {
        bytes += await resolveFileSize(path, item);
        files += 1;
      }
    }

    if (data.length < 1000) break;
    offset += 1000;
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
