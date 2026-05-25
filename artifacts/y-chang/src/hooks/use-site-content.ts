import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SiteService, SiteTrainingCourse, ServiceStatus, TrainingStatus } from "@/data/catalog";
import {
  loadServices,
  loadTrainingCourses,
  loadPublishedServices,
  loadPublicTraining,
  updateServiceStatus,
  updateTrainingStatus,
  upsertService,
  upsertTrainingCourse,
  seedCatalogToSupabase,
} from "@/lib/site-content";

export const servicesQueryKey = ["site-services"] as const;
export const trainingQueryKey = ["site-training"] as const;

export function useAdminServices() {
  return useQuery({
    queryKey: servicesQueryKey,
    queryFn: loadServices,
  });
}

export function useAdminTraining() {
  return useQuery({
    queryKey: trainingQueryKey,
    queryFn: loadTrainingCourses,
  });
}

export function usePublicServices(category?: SiteService["category"]) {
  return useQuery({
    queryKey: [...servicesQueryKey, "public", category ?? "all"],
    queryFn: () => loadPublishedServices(category),
  });
}

export function usePublicTraining(category?: SiteTrainingCourse["category"]) {
  return useQuery({
    queryKey: [...trainingQueryKey, "public", category ?? "all"],
    queryFn: () => loadPublicTraining(category),
  });
}

export function useServiceMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: servicesQueryKey });
  };

  const toggleStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ServiceStatus }) =>
      updateServiceStatus(id, status),
    onSuccess: invalidate,
  });

  const saveService = useMutation({
    mutationFn: (service: SiteService) => upsertService(service),
    onSuccess: invalidate,
  });

  const seedCatalog = useMutation({
    mutationFn: seedCatalogToSupabase,
    onSuccess: invalidate,
  });

  return { toggleStatus, saveService, seedCatalog };
}

export function useTrainingMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: trainingQueryKey });
  };

  const toggleStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TrainingStatus }) =>
      updateTrainingStatus(id, status),
    onSuccess: invalidate,
  });

  const saveCourse = useMutation({
    mutationFn: (course: SiteTrainingCourse) => upsertTrainingCourse(course),
    onSuccess: invalidate,
  });

  const seedCatalog = useMutation({
    mutationFn: seedCatalogToSupabase,
    onSuccess: invalidate,
  });

  return { toggleStatus, saveCourse, seedCatalog };
}
