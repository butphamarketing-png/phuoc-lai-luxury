import { useQuery } from "@tanstack/react-query";
import { fetchSiteStorageUsage } from "@/lib/storage-usage";
import { isSupabaseConfigured } from "@/lib/supabase";

const storageUsageKey = ["admin", "storage-usage"] as const;

export function useStorageUsage() {
  return useQuery({
    queryKey: storageUsageKey,
    queryFn: fetchSiteStorageUsage,
    enabled: isSupabaseConfigured(),
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}
