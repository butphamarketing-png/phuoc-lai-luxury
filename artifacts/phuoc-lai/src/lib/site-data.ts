import { supabase } from "@/lib/supabase";
import type {
  LeadInput,
  ServiceDetail,
  ServiceItem,
  SiteSettings,
  TrainingDetail,
  TrainingItem,
} from "@/types/site";

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_label: string;
  image_url: string;
  price_display: string;
  author_name: string;
  status: string;
  bullets: string[] | null;
  sort_order: number;
  detail_json: Record<string, unknown> | null;
};

type TrainingRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  level_label: string;
  duration_display: string;
  image_url: string;
  description: string;
  status: string;
  bullets: string[] | null;
  sort_order: number;
  detail_json: Record<string, unknown> | null;
};

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Phuoc Lai Luxury",
  phone: "+84909203108",
  phoneDisplay: "0909 203 108",
  email: "Phuocduocvt13@gmai.com",
  address: "42a Bà Triệu, Phường 1, TP Vũng Tàu",
  hours: "9:00 - 19:00 hàng ngày",
  facebook: "https://facebook.com/phuoclai.pmu",
  instagram: "https://instagram.com/phuoclai.pmu",
  zalo: "https://zalo.me/0909203108",
  messenger: "https://m.me/phuoclai.pmu",
  bookingNote: "Vui lòng đặt lịch trước khi đến",
};

function mapService(row: ServiceRow): ServiceItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    categoryLabel: row.category_label,
    image: row.image_url,
    price: row.price_display,
    author: row.author_name,
    status: row.status,
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
    sortOrder: row.sort_order,
  };
}

function mapTraining(row: TrainingRow): TrainingItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    level: row.level_label,
    duration: row.duration_display,
    image: row.image_url,
    description: row.description,
    status: row.status,
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
    sortOrder: row.sort_order,
  };
}

function mapServiceDetail(row: ServiceRow): ServiceDetail | null {
  const detail = row.detail_json;
  if (!detail || typeof detail !== "object" || !("intro" in detail)) {
    return {
      title: row.title,
      category: row.category_label,
      image: row.image_url,
      date: "—",
      author: row.author_name,
      readTime: "5 phút đọc",
      intro: row.title,
      metaDescription: undefined,
      bodyHtml: undefined,
      seo: {},
      sections: [],
    };
  }

  const d = detail as Record<string, unknown>;
  const seo = (d.seo as ServiceDetail["seo"]) ?? {};

  return {
    title: (d.title as string) ?? row.title,
    category: (d.category as string) ?? row.category_label,
    image: (d.image as string) ?? row.image_url,
    date: (d.date as string) ?? "—",
    author: (d.author as string) ?? row.author_name,
    readTime: "5 phút đọc",
    intro: d.intro as string,
    metaDescription: d.metaDescription as string | undefined,
    bodyHtml: d.bodyHtml as string | undefined,
    seo,
    sections: Array.isArray(d.sections) ? (d.sections as ServiceDetail["sections"]) : [],
  };
}

function mapTrainingDetail(row: TrainingRow): TrainingDetail | null {
  const detail = row.detail_json;
  if (!detail || typeof detail !== "object" || !("intro" in detail)) return null;

  const d = detail as Record<string, unknown>;
  const seo = (d.seo as TrainingDetail["seo"]) ?? {};

  return {
    title: (d.title as string) ?? row.title,
    level: (d.level as string) ?? row.level_label,
    image: (d.image as string) ?? row.image_url,
    date: (d.date as string) ?? "—",
    instructor: (d.instructor as string) ?? "Phuoc Lai Master",
    duration: (d.duration as string) ?? row.duration_display,
    intro: d.intro as string,
    metaDescription: d.metaDescription as string | undefined,
    bodyHtml: d.bodyHtml as string | undefined,
    seo,
    sections: Array.isArray(d.sections) ? (d.sections as TrainingDetail["sections"]) : [],
    curriculum: Array.isArray(d.curriculum) ? (d.curriculum as string[]) : [],
  };
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!supabase) return DEFAULT_SETTINGS;

  const { data, error } = await supabase
    .from("site_settings")
    .select("settings_json")
    .eq("id", "default")
    .maybeSingle();

  if (error || !data?.settings_json) return DEFAULT_SETTINGS;

  const s = data.settings_json as Record<string, string>;
  return {
    siteName: s.siteName ?? DEFAULT_SETTINGS.siteName,
    phone: s.phone ?? DEFAULT_SETTINGS.phone,
    phoneDisplay: s.phoneDisplay ?? DEFAULT_SETTINGS.phoneDisplay,
    email: s.email ?? DEFAULT_SETTINGS.email,
    address: s.address ?? DEFAULT_SETTINGS.address,
    hours: s.hours ?? DEFAULT_SETTINGS.hours,
    facebook: s.facebook ?? DEFAULT_SETTINGS.facebook,
    instagram: s.instagram ?? DEFAULT_SETTINGS.instagram,
    zalo: s.zalo ?? DEFAULT_SETTINGS.zalo,
    messenger: s.messenger ?? DEFAULT_SETTINGS.messenger,
    bookingNote: s.bookingNote ?? DEFAULT_SETTINGS.bookingNote,
  };
}

export async function fetchPublishedServices(): Promise<ServiceItem[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("site_services")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return (data as ServiceRow[]).map(mapService);
}

export async function fetchPublishedCourses(): Promise<TrainingItem[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("site_training_courses")
    .select("*")
    .neq("status", "hidden")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return (data as TrainingRow[]).map(mapTraining);
}

export async function fetchServiceDetail(slug: string): Promise<ServiceDetail | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("site_services")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return mapServiceDetail(data as ServiceRow);
}

export async function fetchTrainingDetail(slug: string): Promise<TrainingDetail | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("site_training_courses")
    .select("*")
    .eq("slug", slug)
    .neq("status", "hidden")
    .maybeSingle();

  if (error || !data) return null;
  return mapTrainingDetail(data as TrainingRow);
}

export async function submitLead(input: LeadInput): Promise<void> {
  if (!supabase) throw new Error("Supabase chưa được cấu hình");

  const noteParts = [input.note?.trim()].filter(Boolean);
  if (input.source === "booking" && !noteParts.some((n) => n?.includes("[Form booking]"))) {
    noteParts.unshift("[Form booking]");
  }

  const row = {
    id: `cust-${Date.now()}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() ?? "",
    service_interest: input.serviceInterest.trim(),
    note: noteParts.join(" · "),
    status: "new",
  };

  const { error } = await supabase.from("site_customers").insert(row);
  if (error) throw error;

  try {
    await fetch("/api/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.name,
        phone: input.phone,
        serviceInterest: input.serviceInterest,
        note: row.note,
        source: input.source === "booking" ? "Trang chủ - Đặt lịch" : "Trang Liên hệ",
      }),
    });
  } catch {
    // optional notification endpoint
  }
}
