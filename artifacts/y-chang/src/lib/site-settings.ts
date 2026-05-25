import { BUSINESS } from "@/lib/seo";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export interface SiteSettings {
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  hours: string;
  facebook: string;
  instagram: string;
  zalo: string;
  messenger: string;
  siteName: string;
  bookingNote?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: BUSINESS.phone,
  phoneDisplay: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
  address: `${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}`,
  hours: "9:00 – 19:00 hàng ngày",
  facebook: BUSINESS.facebook,
  instagram: BUSINESS.instagram,
  zalo: BUSINESS.zalo,
  messenger: "https://m.me/phuoclai.pmu",
  siteName: BUSINESS.name,
};

let settingsCache: SiteSettings | null = null;

function mergeSettings(raw: Partial<SiteSettings> | null): SiteSettings {
  return { ...DEFAULT_SITE_SETTINGS, ...raw };
}

export async function loadSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    return settingsCache ?? DEFAULT_SITE_SETTINGS;
  }

  const { data, error } = await getSupabaseClient()
    .from("site_settings")
    .select("settings_json")
    .eq("id", "default")
    .maybeSingle();

  if (error || !data?.settings_json) {
    return settingsCache ?? DEFAULT_SITE_SETTINGS;
  }

  const merged = mergeSettings(data.settings_json as Partial<SiteSettings>);
  settingsCache = merged;
  return merged;
}

export async function saveSiteSettings(
  settings: SiteSettings,
): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    settingsCache = settings;
    return settings;
  }

  const { error } = await getSupabaseClient()
    .from("site_settings")
    .upsert({
      id: "default",
      settings_json: settings,
      updated_at: new Date().toISOString(),
    });

  if (error) throw error;
  settingsCache = settings;
  return settings;
}
