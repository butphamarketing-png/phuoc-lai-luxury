import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchPublishedCourses,
  fetchPublishedServices,
  fetchServiceDetail,
  fetchSiteSettings,
  fetchTrainingDetail,
  submitLead,
} from "@/lib/site-data";
import type { LeadInput } from "@/types/site";

export const siteKeys = {
  settings: ["site-settings"] as const,
  services: ["site-services"] as const,
  courses: ["site-courses"] as const,
  serviceDetail: (slug: string) => ["site-service", slug] as const,
  courseDetail: (slug: string) => ["site-course", slug] as const,
};

export function useSiteSettings() {
  return useQuery({
    queryKey: siteKeys.settings,
    queryFn: fetchSiteSettings,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublishedServices() {
  return useQuery({
    queryKey: siteKeys.services,
    queryFn: fetchPublishedServices,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublishedCourses() {
  return useQuery({
    queryKey: siteKeys.courses,
    queryFn: fetchPublishedCourses,
    staleTime: 5 * 60 * 1000,
  });
}

export function useServiceDetail(slug: string) {
  return useQuery({
    queryKey: siteKeys.serviceDetail(slug),
    queryFn: () => fetchServiceDetail(slug),
    enabled: !!slug,
  });
}

export function useTrainingDetail(slug: string) {
  return useQuery({
    queryKey: siteKeys.courseDetail(slug),
    queryFn: () => fetchTrainingDetail(slug),
    enabled: !!slug,
  });
}

export function useSubmitLead() {
  return useMutation({
    mutationFn: (input: LeadInput) => submitLead(input),
  });
}
