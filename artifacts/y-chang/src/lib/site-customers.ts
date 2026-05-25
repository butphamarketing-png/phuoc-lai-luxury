import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export type CustomerStatus = "new" | "contacted" | "done";

export interface SiteCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceInterest: string;
  note: string;
  status: CustomerStatus;
  createdAt: string;
}

type CustomerRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service_interest: string | null;
  note: string | null;
  status: string;
  created_at: string;
};

let customersCache: SiteCustomer[] | null = null;

function mapRow(row: CustomerRow): SiteCustomer {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? "",
    serviceInterest: row.service_interest ?? "",
    note: row.note ?? "",
    status: row.status as CustomerStatus,
    createdAt: row.created_at,
  };
}

async function fetchFromDb(): Promise<SiteCustomer[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await getSupabaseClient()
    .from("site_customers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return null;
  return (data as CustomerRow[]).map(mapRow);
}

export async function loadCustomers(): Promise<SiteCustomer[]> {
  const fromDb = await fetchFromDb();
  if (fromDb !== null) {
    customersCache = fromDb;
    return fromDb;
  }
  return customersCache ?? [];
}

export interface NewCustomerInput {
  name: string;
  phone: string;
  email?: string;
  serviceInterest?: string;
  note?: string;
}

export async function submitCustomerLead(
  input: NewCustomerInput,
): Promise<void> {
  const row = {
    id: `cust-${Date.now()}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() ?? "",
    service_interest: input.serviceInterest?.trim() ?? "",
    note: input.note?.trim() ?? "",
    status: "new" as const,
  };

  if (!isSupabaseConfigured()) {
    customersCache = [
      {
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email,
        serviceInterest: row.service_interest,
        note: row.note,
        status: "new",
        createdAt: new Date().toISOString(),
      },
      ...(customersCache ?? []),
    ];
    return;
  }

  const { error } = await getSupabaseClient()
    .from("site_customers")
    .insert(row);
  if (error) throw error;
}

export async function updateCustomerStatus(
  id: string,
  status: CustomerStatus,
): Promise<SiteCustomer[]> {
  if (!isSupabaseConfigured()) {
    customersCache = (customersCache ?? []).map((c) =>
      c.id === id ? { ...c, status } : c,
    );
    return customersCache;
  }
  const { error } = await getSupabaseClient()
    .from("site_customers")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
  return loadCustomers();
}

export async function deleteCustomer(id: string): Promise<SiteCustomer[]> {
  if (!isSupabaseConfigured()) {
    customersCache = (customersCache ?? []).filter((c) => c.id !== id);
    return customersCache;
  }
  const { error } = await getSupabaseClient()
    .from("site_customers")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return loadCustomers();
}
