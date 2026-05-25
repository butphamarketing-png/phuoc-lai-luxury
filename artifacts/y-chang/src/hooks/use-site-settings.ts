import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loadSiteSettings,
  saveSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings";

export const settingsQueryKey = ["site-settings"] as const;

export function useSiteSettings() {
  return useQuery({
    queryKey: settingsQueryKey,
    queryFn: loadSiteSettings,
  });
}

export function useSettingsMutations() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: SiteSettings) => saveSiteSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKey });
    },
  });
}
