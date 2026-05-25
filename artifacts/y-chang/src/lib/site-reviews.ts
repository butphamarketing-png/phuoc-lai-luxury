import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export type ReviewStatus = "published" | "hidden";

export interface SiteReview {
  id: string;
  authorName: string;
  serviceLabel: string;
  rating: number;
  content: string;
  imageUrl: string;
  reviewDate: string;
  status: ReviewStatus;
  sortOrder: number;
}

type ReviewRow = {
  id: string;
  author_name: string;
  service_label: string;
  rating: number;
  content: string;
  image_url: string;
  review_date: string;
  status: string;
  sort_order: number;
};

let reviewsCache: SiteReview[] | null = null;

function mapRow(row: ReviewRow): SiteReview {
  return {
    id: row.id,
    authorName: row.author_name,
    serviceLabel: row.service_label,
    rating: row.rating,
    content: row.content,
    imageUrl: row.image_url,
    reviewDate: row.review_date,
    status: row.status as ReviewStatus,
    sortOrder: row.sort_order,
  };
}

function toRow(review: SiteReview): ReviewRow {
  return {
    id: review.id,
    author_name: review.authorName,
    service_label: review.serviceLabel,
    rating: review.rating,
    content: review.content,
    image_url: review.imageUrl,
    review_date: review.reviewDate,
    status: review.status,
    sort_order: review.sortOrder,
  };
}

async function fetchFromDb(): Promise<SiteReview[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await getSupabaseClient()
    .from("site_reviews")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return null;
  return (data as ReviewRow[]).map(mapRow);
}

export async function loadReviews(): Promise<SiteReview[]> {
  const fromDb = await fetchFromDb();
  if (fromDb !== null) {
    reviewsCache = fromDb;
    return fromDb;
  }
  return reviewsCache ?? [];
}

export async function loadPublishedReviews(): Promise<SiteReview[]> {
  const all = await loadReviews();
  return all
    .filter((r) => r.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function upsertReview(review: SiteReview): Promise<SiteReview[]> {
  if (!isSupabaseConfigured()) {
    const base = reviewsCache ?? [];
    const exists = base.some((r) => r.id === review.id);
    reviewsCache = exists
      ? base.map((r) => (r.id === review.id ? review : r))
      : [...base, review];
    return reviewsCache;
  }
  const { error } = await getSupabaseClient()
    .from("site_reviews")
    .upsert(toRow(review));
  if (error) throw error;
  return loadReviews();
}

export async function deleteReview(id: string): Promise<SiteReview[]> {
  if (!isSupabaseConfigured()) {
    reviewsCache = (reviewsCache ?? []).filter((r) => r.id !== id);
    return reviewsCache;
  }
  const { error } = await getSupabaseClient()
    .from("site_reviews")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return loadReviews();
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<SiteReview[]> {
  if (!isSupabaseConfigured()) {
    reviewsCache = (reviewsCache ?? []).map((r) =>
      r.id === id ? { ...r, status } : r,
    );
    return reviewsCache;
  }
  const { error } = await getSupabaseClient()
    .from("site_reviews")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  return loadReviews();
}
