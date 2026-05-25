import {
  CATALOG_SERVICES,
  CATALOG_TRAINING,
  type SiteService,
  type SiteTrainingCourse,
  type ServiceStatus,
  type TrainingStatus,
} from "@/data/catalog";
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
  sort_order: number;
};

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
    sort_order: course.sortOrder,
  };
}

async function fetchServicesFromDb(): Promise<SiteService[] | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await getSupabaseClient()
    .from("site_services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return null;
  if (!data?.length) return null;
  return (data as ServiceRow[]).map(mapServiceRow);
}

async function fetchTrainingFromDb(): Promise<SiteTrainingCourse[] | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await getSupabaseClient()
    .from("site_training_courses")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return null;
  return (data as TrainingRow[]).map(mapTrainingRow);
}

export async function loadServices(): Promise<SiteService[]> {
  const fromDb = await fetchServicesFromDb();
  if (fromDb) {
    servicesCache = fromDb;
    return fromDb;
  }
  return servicesCache ?? [...CATALOG_SERVICES];
}

export async function loadTrainingCourses(): Promise<SiteTrainingCourse[]> {
  const fromDb = await fetchTrainingFromDb();
  if (fromDb) {
    trainingCache = fromDb;
    return fromDb;
  }
  return trainingCache ?? [...CATALOG_TRAINING];
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

export async function updateServiceStatus(
  id: string,
  status: ServiceStatus,
): Promise<SiteService[]> {
  if (!isSupabaseConfigured()) {
    const next = (servicesCache ?? CATALOG_SERVICES).map((s) =>
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
    const next = (trainingCache ?? CATALOG_TRAINING).map((c) =>
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
  if (!isSupabaseConfigured()) {
    const base = servicesCache ?? CATALOG_SERVICES;
    const exists = base.some((s) => s.id === service.id);
    const next = exists
      ? base.map((s) => (s.id === service.id ? service : s))
      : [...base, service];
    servicesCache = next;
    return next;
  }

  const { error } = await getSupabaseClient()
    .from("site_services")
    .upsert(serviceToRow(service));

  if (error) throw error;
  return loadServices();
}

export async function upsertTrainingCourse(
  course: SiteTrainingCourse,
): Promise<SiteTrainingCourse[]> {
  if (!isSupabaseConfigured()) {
    const base = trainingCache ?? CATALOG_TRAINING;
    const exists = base.some((c) => c.id === course.id);
    const next = exists
      ? base.map((c) => (c.id === course.id ? course : c))
      : [...base, course];
    trainingCache = next;
    return next;
  }

  const { error } = await getSupabaseClient()
    .from("site_training_courses")
    .upsert(trainingToRow(course));

  if (error) throw error;
  return loadTrainingCourses();
}

export async function seedCatalogToSupabase(): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Chưa cấu hình Supabase");
  }

  const supabase = getSupabaseClient();
  const { error: servicesError } = await supabase
    .from("site_services")
    .upsert(CATALOG_SERVICES.map(serviceToRow));

  if (servicesError) throw servicesError;

  const { error: trainingError } = await supabase
    .from("site_training_courses")
    .upsert(CATALOG_TRAINING.map(trainingToRow));

  if (trainingError) throw trainingError;
}
