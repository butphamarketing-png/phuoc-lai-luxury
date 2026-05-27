import {
  type SiteService,
  type SiteTrainingCourse,
  type ServiceStatus,
  type TrainingStatus,
} from "@/data/catalog";
import {
  type ServiceDetailContent,
  type TrainingDetailContent,
} from "@/data/content-details";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

let servicesCache: SiteService[] | null = null;
let trainingCache: SiteTrainingCourse[] | null = null;

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
  bullets: string[];
  detail_json: ServiceDetailContent | null;
  sort_order: number;
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
  students_count: number;
  bullets: string[];
  detail_json: TrainingDetailContent | null;
  sort_order: number;
};

function mergeServiceDetail(
  row: Partial<ServiceRow>,
): ServiceDetailContent | undefined {
  const fromDb = row.detail_json as ServiceDetailContent | null | undefined;
  if (!fromDb || typeof fromDb !== "object" || !fromDb.intro) return undefined;
  return {
    ...fromDb,
    title: row.title ?? fromDb.title,
    category: row.category_label ?? fromDb.category,
    image: row.image_url ?? fromDb.image,
    author: row.author_name ?? fromDb.author,
  };
}

function mergeTrainingDetail(
  row: Partial<TrainingRow>,
): TrainingDetailContent | undefined {
  const fromDb = row.detail_json as TrainingDetailContent | null | undefined;
  if (!fromDb || typeof fromDb !== "object" || !fromDb.intro) return undefined;
  return {
    ...fromDb,
    title: row.title ?? fromDb.title,
    image: row.image_url ?? fromDb.image,
    level: row.level_label ?? fromDb.level,
    duration: row.duration_display ?? fromDb.duration,
  };
}

function mapServiceRow(row: ServiceRow): SiteService {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category as SiteService["category"],
    categoryLabel: row.category_label,
    image: row.image_url,
    price: row.price_display,
    author: row.author_name,
    status: row.status as ServiceStatus,
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
    sortOrder: row.sort_order,
    detail: mergeServiceDetail(row),
  };
}

function mapTrainingRow(row: TrainingRow): SiteTrainingCourse {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category as SiteTrainingCourse["category"],
    level: row.level_label,
    duration: row.duration_display,
    image: row.image_url,
    description: row.description,
    status: row.status as TrainingStatus,
    students: row.students_count,
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
    sortOrder: row.sort_order,
    detail: mergeTrainingDetail(row),
  };
}

function serviceToRow(service: SiteService): ServiceRow {
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    category: service.category,
    category_label: service.categoryLabel,
    image_url: service.image,
    price_display: service.price,
    author_name: service.author,
    status: service.status,
    bullets: service.bullets,
    detail_json: service.detail ?? null,
    sort_order: service.sortOrder,
  };
}

function trainingToRow(course: SiteTrainingCourse): TrainingRow {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    level_label: course.level,
    duration_display: course.duration,
    image_url: course.image,
    description: course.description,
    status: course.status,
    students_count: course.students,
    bullets: course.bullets,
    detail_json: course.detail ?? null,
    sort_order: course.sortOrder,
  };
}

function fallbackServiceDetail(service: SiteService): ServiceDetailContent {
  return {
    title: service.title,
    category: service.categoryLabel,
    image: service.image,
    date: "—",
    author: service.author,
    readTime: "5 phút đọc",
    intro: service.title,
    metaDescription: undefined,
    bodyHtml: undefined,
    seo: {},
    sections: [],
  };
}

export async function loadServiceDetail(
  slug: string,
): Promise<ServiceDetailContent | null> {
  const normalized = slug.trim().toLowerCase();
  const services = await loadPublishedServices();
  const item = services.find(
    (s) => s.slug === slug || s.slug.toLowerCase() === normalized,
  );
  if (!item) return null;
  return item.detail ?? fallbackServiceDetail(item);
}

export async function loadTrainingDetail(
  slug: string,
): Promise<TrainingDetailContent | null> {
  const courses = await loadTrainingCourses();
  const item = courses.find((c) => c.slug === slug);
  return item?.detail ?? null;
}

export async function updateServiceDetail(
  id: string,
  detail: ServiceDetailContent,
): Promise<void> {
  if (!isSupabaseConfigured()) {
    const base = servicesCache ?? [];
    servicesCache = base.map((s) => (s.id === id ? { ...s, detail } : s));
    return;
  }

  const { error } = await getSupabaseClient()
    .from("site_services")
    .update({
      detail_json: detail,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
  servicesCache = null;
}

export async function updateTrainingDetail(
  id: string,
  detail: TrainingDetailContent,
): Promise<void> {
  if (!isSupabaseConfigured()) {
    const base = trainingCache ?? [];
    trainingCache = base.map((c) => (c.id === id ? { ...c, detail } : c));
    return;
  }

  const { error } = await getSupabaseClient()
    .from("site_training_courses")
    .update({
      detail_json: detail,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
  trainingCache = null;
}

async function fetchServicesFromDb(): Promise<SiteService[] | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await getSupabaseClient()
    .from("site_services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return null;
  return (data as ServiceRow[]).map(mapServiceRow);
}

async function fetchTrainingFromDb(): Promise<SiteTrainingCourse[] | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await getSupabaseClient()
    .from("site_training_courses")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return null;
  return (data as TrainingRow[]).map(mapTrainingRow);
}

export async function loadServices(): Promise<SiteService[]> {
  const fromDb = await fetchServicesFromDb();
  if (fromDb !== null) {
    servicesCache = fromDb;
    return fromDb;
  }
  return servicesCache ?? [];
}

export async function loadTrainingCourses(): Promise<SiteTrainingCourse[]> {
  const fromDb = await fetchTrainingFromDb();
  if (fromDb !== null) {
    trainingCache = fromDb;
    return fromDb;
  }
  return trainingCache ?? [];
}

export async function loadPublishedServices(
  category?: SiteService["category"],
): Promise<SiteService[]> {
  const all = await loadServices();
  return all
    .filter((s) => s.status === "published")
    .filter((s) => (category ? s.category === category : true))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function loadPublicTraining(
  category?: SiteTrainingCourse["category"],
): Promise<SiteTrainingCourse[]> {
  const all = await loadTrainingCourses();
  return all
    .filter((c) => c.status !== "hidden")
    .filter((c) => (category ? c.category === category : true))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function deleteService(id: string): Promise<SiteService[]> {
  if (!isSupabaseConfigured()) {
    servicesCache = (servicesCache ?? []).filter((s) => s.id !== id);
    return servicesCache;
  }

  const { error } = await getSupabaseClient()
    .from("site_services")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return loadServices();
}

export async function deleteTrainingCourse(
  id: string,
): Promise<SiteTrainingCourse[]> {
  if (!isSupabaseConfigured()) {
    trainingCache = (trainingCache ?? []).filter((c) => c.id !== id);
    return trainingCache;
  }

  const { error } = await getSupabaseClient()
    .from("site_training_courses")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return loadTrainingCourses();
}

export async function clearAllServices(): Promise<void> {
  if (!isSupabaseConfigured()) {
    servicesCache = [];
    return;
  }

  const supabase = getSupabaseClient();
  const { data: rows, error: selectError } = await supabase
    .from("site_services")
    .select("id");

  if (selectError) throw selectError;
  if (rows?.length) {
    const { error } = await supabase
      .from("site_services")
      .delete()
      .in(
        "id",
        rows.map((r) => r.id),
      );
    if (error) throw error;
  }
  servicesCache = [];
}

export async function clearAllTrainingCourses(): Promise<void> {
  if (!isSupabaseConfigured()) {
    trainingCache = [];
    return;
  }

  const supabase = getSupabaseClient();
  const { data: rows, error: selectError } = await supabase
    .from("site_training_courses")
    .select("id");

  if (selectError) throw selectError;
  if (rows?.length) {
    const { error } = await supabase
      .from("site_training_courses")
      .delete()
      .in(
        "id",
        rows.map((r) => r.id),
      );
    if (error) throw error;
  }
  trainingCache = [];
}

export async function updateServiceStatus(
  id: string,
  status: ServiceStatus,
): Promise<SiteService[]> {
  if (!isSupabaseConfigured()) {
    const next = (servicesCache ?? []).map((s) =>
      s.id === id ? { ...s, status } : s,
    );
    servicesCache = next;
    return next;
  }

  const { error } = await getSupabaseClient()
    .from("site_services")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
  return loadServices();
}

export async function updateTrainingStatus(
  id: string,
  status: TrainingStatus,
): Promise<SiteTrainingCourse[]> {
  if (!isSupabaseConfigured()) {
    const next = (trainingCache ?? []).map((c) =>
      c.id === id ? { ...c, status } : c,
    );
    trainingCache = next;
    return next;
  }

  const { error } = await getSupabaseClient()
    .from("site_training_courses")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
  return loadTrainingCourses();
}

export async function upsertService(service: SiteService): Promise<SiteService[]> {
  const row = serviceToRow(service);
  if (!service.detail && isSupabaseConfigured()) {
    const { data } = await getSupabaseClient()
      .from("site_services")
      .select("detail_json")
      .eq("id", service.id)
      .maybeSingle();
    if (data?.detail_json) row.detail_json = data.detail_json as ServiceDetailContent;
  }

  if (!isSupabaseConfigured()) {
    const base = servicesCache ?? [];
    const exists = base.some((s) => s.id === service.id);
    const next = exists
      ? base.map((s) => (s.id === service.id ? service : s))
      : [...base, service];
    servicesCache = next;
    return next;
  }

  const { error } = await getSupabaseClient()
    .from("site_services")
    .upsert(row);

  if (error) throw error;
  return loadServices();
}

export async function upsertTrainingCourse(
  course: SiteTrainingCourse,
): Promise<SiteTrainingCourse[]> {
  const row = trainingToRow(course);
  if (!course.detail && isSupabaseConfigured()) {
    const { data } = await getSupabaseClient()
      .from("site_training_courses")
      .select("detail_json")
      .eq("id", course.id)
      .maybeSingle();
    if (data?.detail_json) row.detail_json = data.detail_json as TrainingDetailContent;
  }

  if (!isSupabaseConfigured()) {
    const base = trainingCache ?? [];
    const exists = base.some((c) => c.id === course.id);
    const next = exists
      ? base.map((c) => (c.id === course.id ? course : c))
      : [...base, course];
    trainingCache = next;
    return next;
  }

  const { error } = await getSupabaseClient()
    .from("site_training_courses")
    .upsert(row);

  if (error) throw error;
  return loadTrainingCourses();
}
