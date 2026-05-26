-- =============================================================================
-- PHUOC LAI LUXURY — SUPABASE SETUP ĐẦY ĐỦ (A → Z)
-- =============================================================================
-- Chạy 1 LẦN duy nhất trong: Supabase → SQL Editor → New query → Paste → Run
--
-- Bao gồm:
--   • Bảng: dịch vụ, đào tạo, đánh giá, khách hàng (liên hệ/booking), cài đặt
--   • Index, trigger updated_at, RLS, quyền API
--   • Storage bucket upload ảnh CMS
--   • Dữ liệu mặc định cài đặt website
--
-- SAU KHI CHẠY XONG:
--   1. Authentication → Users → Add user (email + mật khẩu admin)
--   2. Settings → API → copy vào Vercel:
--        VITE_SUPABASE_URL
--        VITE_SUPABASE_ANON_KEY
--        VITE_SITE_URL = https://phunxamvungtau.com
--   3. Redeploy website
--   4. Đăng nhập https://phunxamvungtau.com/adminbp
--   5. Thêm dịch vụ / khóa học / đánh giá trong admin (không có dữ liệu mẫu)
--
-- XÓA TOÀN BỘ DỊCH VỤ & ĐÀO TẠO (tùy chọn): chạy thêm file clear-content.sql
-- =============================================================================


-- =============================================================================
-- A. HÀM DÙNG CHUNG
-- =============================================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =============================================================================
-- B. BẢNG DỊCH VỤ (site_services)
-- =============================================================================

create table if not exists public.site_services (
  id text primary key,
  slug text unique not null,
  title text not null,
  category text not null check (category in ('phun-xam', 'spa')),
  category_label text not null,
  image_url text not null default '',
  price_display text not null default '',
  author_name text not null default 'Phuoc Lai',
  status text not null default 'published'
    check (status in ('published', 'hidden')),
  bullets jsonb not null default '[]'::jsonb,
  detail_json jsonb,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.site_services add column if not exists detail_json jsonb;
alter table public.site_services add column if not exists updated_at timestamptz not null default now();


-- =============================================================================
-- C. BẢNG ĐÀO TẠO (site_training_courses)
-- =============================================================================

create table if not exists public.site_training_courses (
  id text primary key,
  slug text unique not null,
  title text not null,
  category text not null check (category in ('phun-xam', 'spa')),
  level_label text not null default '',
  duration_display text not null default '',
  image_url text not null default '',
  description text not null default '',
  status text not null default 'open'
    check (status in ('open', 'coming_soon', 'hidden')),
  students_count int not null default 0,
  bullets jsonb not null default '[]'::jsonb,
  detail_json jsonb,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.site_training_courses add column if not exists detail_json jsonb;
alter table public.site_training_courses add column if not exists updated_at timestamptz not null default now();


-- =============================================================================
-- D. BẢNG ĐÁNH GIÁ (site_reviews) — trang /feedback
-- =============================================================================

create table if not exists public.site_reviews (
  id text primary key,
  author_name text not null,
  service_label text not null default '',
  rating int not null default 5 check (rating >= 1 and rating <= 5),
  content text not null default '',
  image_url text not null default '/hero-portrait.png',
  review_date text not null default '',
  status text not null default 'published'
    check (status in ('published', 'hidden')),
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);


-- =============================================================================
-- E. BẢNG KHÁCH HÀNG (site_customers) — form Liên hệ + popup Booking
-- =============================================================================

create table if not exists public.site_customers (
  id text primary key,
  name text not null,
  phone text not null,
  email text default '',
  service_interest text default '',
  note text default '',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'done')),
  created_at timestamptz not null default now()
);


-- =============================================================================
-- F. BẢNG CÀI ĐẶT (site_settings) — hotline, địa chỉ, MXH
-- =============================================================================

create table if not exists public.site_settings (
  id text primary key default 'default',
  settings_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, settings_json)
values (
  'default',
  '{
    "phone": "+84909203108",
    "phoneDisplay": "0909 203 108",
    "email": "hello@phuoclai.com",
    "address": "42a Bà Triệu, Phường 1, TP Vũng Tàu",
    "hours": "9:00 – 19:00 hàng ngày",
    "facebook": "https://facebook.com/phuoclai.pmu",
    "instagram": "https://instagram.com/phuoclai.pmu",
    "zalo": "https://zalo.me/0909203108",
    "messenger": "https://m.me/phuoclai.pmu",
    "siteName": "Phuoc Lai Luxury",
    "bookingNote": "Vui lòng đặt lịch trước khi đến"
  }'::jsonb
)
on conflict (id) do nothing;


-- =============================================================================
-- G. INDEX (tối ưu tốc độ)
-- =============================================================================

create index if not exists idx_site_services_slug on public.site_services (slug);
create index if not exists idx_site_services_status_sort on public.site_services (status, sort_order);

create index if not exists idx_site_training_slug on public.site_training_courses (slug);
create index if not exists idx_site_training_status_sort on public.site_training_courses (status, sort_order);

create index if not exists idx_site_reviews_status_sort on public.site_reviews (status, sort_order);

create index if not exists idx_site_customers_status_created on public.site_customers (status, created_at desc);


-- =============================================================================
-- H. TRIGGER — tự cập nhật updated_at
-- =============================================================================

drop trigger if exists trg_site_services_updated on public.site_services;
create trigger trg_site_services_updated
  before update on public.site_services
  for each row execute function public.set_updated_at();

drop trigger if exists trg_site_training_updated on public.site_training_courses;
create trigger trg_site_training_updated
  before update on public.site_training_courses
  for each row execute function public.set_updated_at();

drop trigger if exists trg_site_reviews_updated on public.site_reviews;
create trigger trg_site_reviews_updated
  before update on public.site_reviews
  for each row execute function public.set_updated_at();

drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated
  before update on public.site_settings
  for each row execute function public.set_updated_at();


-- =============================================================================
-- I. ROW LEVEL SECURITY (RLS)
-- Khách (anon): đọc dịch vụ/khóa/đánh giá published, đọc cài đặt, gửi form khách
-- Admin (authenticated): full quyền CMS
-- =============================================================================

-- --- site_services ---
alter table public.site_services enable row level security;

drop policy if exists "site_services_select" on public.site_services;
create policy "site_services_select" on public.site_services
  for select using (status = 'published' or auth.uid() is not null);

drop policy if exists "site_services_insert" on public.site_services;
create policy "site_services_insert" on public.site_services
  for insert to authenticated with check (auth.uid() is not null);

drop policy if exists "site_services_update" on public.site_services;
create policy "site_services_update" on public.site_services
  for update to authenticated
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "site_services_delete" on public.site_services;
create policy "site_services_delete" on public.site_services
  for delete to authenticated using (auth.uid() is not null);

drop policy if exists "site_services_write" on public.site_services;

-- --- site_training_courses ---
alter table public.site_training_courses enable row level security;

drop policy if exists "site_training_select" on public.site_training_courses;
create policy "site_training_select" on public.site_training_courses
  for select using (status in ('open', 'coming_soon') or auth.uid() is not null);

drop policy if exists "site_training_insert" on public.site_training_courses;
create policy "site_training_insert" on public.site_training_courses
  for insert to authenticated with check (auth.uid() is not null);

drop policy if exists "site_training_update" on public.site_training_courses;
create policy "site_training_update" on public.site_training_courses
  for update to authenticated
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "site_training_delete" on public.site_training_courses;
create policy "site_training_delete" on public.site_training_courses
  for delete to authenticated using (auth.uid() is not null);

drop policy if exists "site_training_write" on public.site_training_courses;

-- --- site_reviews ---
alter table public.site_reviews enable row level security;

drop policy if exists "site_reviews_select" on public.site_reviews;
create policy "site_reviews_select" on public.site_reviews
  for select using (status = 'published' or auth.uid() is not null);

drop policy if exists "site_reviews_insert" on public.site_reviews;
create policy "site_reviews_insert" on public.site_reviews
  for insert to authenticated with check (auth.uid() is not null);

drop policy if exists "site_reviews_update" on public.site_reviews;
create policy "site_reviews_update" on public.site_reviews
  for update to authenticated
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "site_reviews_delete" on public.site_reviews;
create policy "site_reviews_delete" on public.site_reviews
  for delete to authenticated using (auth.uid() is not null);

drop policy if exists "site_reviews_write" on public.site_reviews;

-- --- site_customers ---
alter table public.site_customers enable row level security;

drop policy if exists "site_customers_select" on public.site_customers;
create policy "site_customers_select" on public.site_customers
  for select to authenticated using (auth.uid() is not null);

drop policy if exists "site_customers_insert_public" on public.site_customers;
create policy "site_customers_insert_public" on public.site_customers
  for insert to anon, authenticated with check (true);

drop policy if exists "site_customers_update" on public.site_customers;
create policy "site_customers_update" on public.site_customers
  for update to authenticated
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "site_customers_delete" on public.site_customers;
create policy "site_customers_delete" on public.site_customers
  for delete to authenticated using (auth.uid() is not null);

-- --- site_settings ---
alter table public.site_settings enable row level security;

drop policy if exists "site_settings_select" on public.site_settings;
create policy "site_settings_select" on public.site_settings
  for select using (true);

drop policy if exists "site_settings_insert" on public.site_settings;
create policy "site_settings_insert" on public.site_settings
  for insert to authenticated with check (auth.uid() is not null);

drop policy if exists "site_settings_update" on public.site_settings;
create policy "site_settings_update" on public.site_settings
  for update to authenticated
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "site_settings_write" on public.site_settings;


-- =============================================================================
-- J. QUYỀN API (anon + authenticated)
-- =============================================================================

grant usage on schema public to anon, authenticated;

grant select on public.site_services to anon, authenticated;
grant select on public.site_training_courses to anon, authenticated;
grant select on public.site_reviews to anon, authenticated;
grant select on public.site_settings to anon, authenticated;

grant insert on public.site_customers to anon, authenticated;

grant insert, update, delete on public.site_services to authenticated;
grant insert, update, delete on public.site_training_courses to authenticated;
grant insert, update, delete on public.site_reviews to authenticated;
grant insert, update, delete on public.site_settings to authenticated;
grant select, update, delete on public.site_customers to authenticated;


-- =============================================================================
-- K. STORAGE — bucket upload ảnh CMS (admin kéo-thả)
-- =============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  52428800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site_media_public_read" on storage.objects;
create policy "site_media_public_read" on storage.objects
  for select using (bucket_id = 'site-media');

drop policy if exists "site_media_admin_insert" on storage.objects;
create policy "site_media_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-media' and auth.uid() is not null);

drop policy if exists "site_media_admin_update" on storage.objects;
create policy "site_media_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-media' and auth.uid() is not null);

drop policy if exists "site_media_admin_delete" on storage.objects;
create policy "site_media_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-media' and auth.uid() is not null);


-- =============================================================================
-- L. KIỂM TRA SAU KHI CHẠY (chạy từng lệnh nếu cần)
-- =============================================================================

-- select 'site_services' as tbl, count(*) from public.site_services
-- union all select 'site_training', count(*) from public.site_training_courses
-- union all select 'site_reviews', count(*) from public.site_reviews
-- union all select 'site_customers', count(*) from public.site_customers
-- union all select 'site_settings', count(*) from public.site_settings;

-- select id, public from storage.buckets where id = 'site-media';

-- select settings_json from public.site_settings where id = 'default';

-- =============================================================================
-- HOÀN TẤT ✓
-- =============================================================================
