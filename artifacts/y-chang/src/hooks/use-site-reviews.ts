import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReview,
  loadPublishedReviews,
  loadReviews,
  updateReviewStatus,
  upsertReview,
  type ReviewStatus,
  type SiteReview,
} from "@/lib/site-reviews";

export const reviewsQueryKey = ["site-reviews"] as const;

export function useAdminReviews() {
  return useQuery({
    queryKey: reviewsQueryKey,
    queryFn: loadReviews,
  });
}

export function usePublicReviews() {
  return useQuery({
    queryKey: [...reviewsQueryKey, "public"],
    queryFn: loadPublishedReviews,
  });
}

export function useReviewMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: reviewsQueryKey });
  };

  const saveReview = useMutation({
    mutationFn: (review: SiteReview) => upsertReview(review),
    onSuccess: invalidate,
  });

  const removeReview = useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: invalidate,
  });

  const toggleStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReviewStatus }) =>
      updateReviewStatus(id, status),
    onSuccess: invalidate,
  });

  return { saveReview, removeReview, toggleStatus };
}
