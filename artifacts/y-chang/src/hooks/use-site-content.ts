import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SiteService, SiteTrainingCourse, ServiceStatus, TrainingStatus } from "@/data/catalog";
import {
  loadServices,
  loadTrainingCourses,
  loadPublishedServices,
  loadPublicTraining,
  loadServiceDetail,
  loadTrainingDetail,
  updateServiceStatus,
  updateTrainingStatus,
  updateServiceDetail,
  updateTrainingDetail,
  upsertService,
  upsertTrainingCourse,
  deleteService,
  deleteTrainingCourse,
  clearAllServices,
  clearAllTrainingCourses,
} from "@/lib/site-content";
import type {
  ServiceDetailContent,
  TrainingDetailContent,
} from "@/data/content-details";

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

export function useServiceDetail(slug: string) {
  return useQuery({
    queryKey: [...servicesQueryKey, "detail", slug],
    queryFn: () => loadServiceDetail(slug),
    enabled: !!slug,
  });
}

export function useTrainingDetail(slug: string) {
  return useQuery({
    queryKey: [...trainingQueryKey, "detail", slug],
    queryFn: () => loadTrainingDetail(slug),
    enabled: !!slug,
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

  const saveDetail = useMutation({
    mutationFn: ({
      id,
      detail,
    }: {
      id: string;
      detail: ServiceDetailContent;
    }) => updateServiceDetail(id, detail),
    onSuccess: invalidate,
  });

  const removeService = useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: invalidate,
  });

  const clearAll = useMutation({
    mutationFn: clearAllServices,
    onSuccess: invalidate,
  });

  return { toggleStatus, saveService, saveDetail, removeService, clearAll };
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

  const saveDetail = useMutation({
    mutationFn: ({
      id,
      detail,
    }: {
      id: string;
      detail: TrainingDetailContent;
    }) => updateTrainingDetail(id, detail),
    onSuccess: invalidate,
  });

  const removeCourse = useMutation({
    mutationFn: (id: string) => deleteTrainingCourse(id),
    onSuccess: invalidate,
  });

  const clearAll = useMutation({
    mutationFn: clearAllTrainingCourses,
    onSuccess: invalidate,
  });

  return { toggleStatus, saveCourse, saveDetail, removeCourse, clearAll };
}
