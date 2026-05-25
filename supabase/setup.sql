-- =============================================================================
-- PHUOC LAI LUXURY — Supabase setup (chạy 1 lần)
-- =============================================================================
-- Vào: https://supabase.com → Project → SQL Editor → New query → Paste → Run
--
-- Sau khi chạy xong:
-- 1. Authentication → Users → Add user (email + mật khẩu admin)
-- 2. Settings → API → copy URL + anon key vào Vercel:
--    VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
-- 3. Redeploy website
-- 4. Admin → Đăng nhập → bấm "Đồng bộ Supabase" để đưa dữ liệu mẫu lên
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Bảng nội dung website
-- -----------------------------------------------------------------------------

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
  -- Nội dung trang chi tiết: intro, bodyHtml, metaDescription, seo, sections
  detail_json jsonb,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

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

-- Nâng cấp từ schema cũ (an toàn chạy lại nhiều lần)
alter table public.site_services
  add column if not exists detail_json jsonb;
alter table public.site_training_courses
  add column if not exists detail_json jsonb;
alter table public.site_services
  add column if not exists updated_at timestamptz not null default now();
alter table public.site_training_courses
  add column if not exists updated_at timestamptz not null default now();

-- -----------------------------------------------------------------------------
-- 2. Index (tải trang nhanh hơn)
-- -----------------------------------------------------------------------------

create index if not exists idx_site_services_slug
  on public.site_services (slug);
create index if not exists idx_site_services_status_sort
  on public.site_services (status, sort_order);
create index if not exists idx_site_training_slug
  on public.site_training_courses (slug);
create index if not exists idx_site_training_status_sort
  on public.site_training_courses (status, sort_order);

-- -----------------------------------------------------------------------------
-- 3. Tự cập nhật updated_at khi sửa
-- -----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_services_updated on public.site_services;
create trigger trg_site_services_updated
  before update on public.site_services
  for each row execute function public.set_updated_at();

drop trigger if exists trg_site_training_updated on public.site_training_courses;
create trigger trg_site_training_updated
  before update on public.site_training_courses
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. Row Level Security (RLS)
-- Khách: chỉ đọc dịch vụ/khóa đang hiển thị
-- Admin (đã đăng nhập Supabase Auth): đọc + ghi tất cả
-- -----------------------------------------------------------------------------

alter table public.site_services enable row level security;
alter table public.site_training_courses enable row level security;

drop policy if exists "site_services_select" on public.site_services;
create policy "site_services_select" on public.site_services
  for select
  using (status = 'published' or auth.uid() is not null);

drop policy if exists "site_services_insert" on public.site_services;
create policy "site_services_insert" on public.site_services
  for insert to authenticated
  with check (auth.uid() is not null);

drop policy if exists "site_services_update" on public.site_services;
create policy "site_services_update" on public.site_services
  for update to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "site_services_delete" on public.site_services;
create policy "site_services_delete" on public.site_services
  for delete to authenticated
  using (auth.uid() is not null);

drop policy if exists "site_training_select" on public.site_training_courses;
create policy "site_training_select" on public.site_training_courses
  for select
  using (status in ('open', 'coming_soon') or auth.uid() is not null);

drop policy if exists "site_training_insert" on public.site_training_courses;
create policy "site_training_insert" on public.site_training_courses
  for insert to authenticated
  with check (auth.uid() is not null);

drop policy if exists "site_training_update" on public.site_training_courses;
create policy "site_training_update" on public.site_training_courses
  for update to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "site_training_delete" on public.site_training_courses;
create policy "site_training_delete" on public.site_training_courses
  for delete to authenticated
  using (auth.uid() is not null);

-- Xóa policy cũ (gộp insert/update/delete) nếu còn từ bản trước
drop policy if exists "site_services_write" on public.site_services;
drop policy if exists "site_training_write" on public.site_training_courses;

-- -----------------------------------------------------------------------------
-- 5. Quyền truy cập API (anon + authenticated)
-- -----------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;
grant select on public.site_services to anon, authenticated;
grant select on public.site_training_courses to anon, authenticated;
grant insert, update, delete on public.site_services to authenticated;
grant insert, update, delete on public.site_training_courses to authenticated;

-- -----------------------------------------------------------------------------
-- 6. Storage — upload ảnh CMS (kéo-thả trong admin)
-- -----------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site_media_public_read" on storage.objects;
create policy "site_media_public_read" on storage.objects
  for select
  using (bucket_id = 'site-media');

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
-- Xong! Kiểm tra nhanh:
--   select count(*) from public.site_services;
--   select id, public from storage.buckets where id = 'site-media';
-- =============================================================================
