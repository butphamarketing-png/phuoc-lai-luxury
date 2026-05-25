-- LEGACY: dùng supabase/setup.sql thay file này (đầy đủ hơn)
-- Chạy trong Supabase → SQL Editor (một lần)
-- Liên kết admin với trang công khai
-- Sau đó chạy thêm: supabase/storage.sql (upload ảnh CMS)

create table if not exists public.site_services (
  id text primary key,
  slug text unique not null,
  title text not null,
  category text not null check (category in ('phun-xam', 'spa')),
  category_label text not null,
  image_url text not null default '',
  price_display text not null default '',
  author_name text not null default 'Phuoc Lai',
  status text not null default 'published' check (status in ('published', 'hidden')),
  bullets jsonb not null default '[]'::jsonb,
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
  status text not null default 'open' check (status in ('open', 'coming_soon', 'hidden')),
  students_count int not null default 0,
  bullets jsonb not null default '[]'::jsonb,
  detail_json jsonb,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- Nếu đã chạy schema cũ, chạy thêm:
-- alter table public.site_services add column if not exists detail_json jsonb;
-- alter table public.site_training_courses add column if not exists detail_json jsonb;

alter table public.site_services enable row level security;
alter table public.site_training_courses enable row level security;

drop policy if exists "site_services_select" on public.site_services;
create policy "site_services_select" on public.site_services
  for select using (status = 'published' or auth.uid() is not null);

drop policy if exists "site_services_write" on public.site_services;
create policy "site_services_write" on public.site_services
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "site_training_select" on public.site_training_courses;
create policy "site_training_select" on public.site_training_courses
  for select using (status in ('open', 'coming_soon') or auth.uid() is not null);

drop policy if exists "site_training_write" on public.site_training_courses;
create policy "site_training_write" on public.site_training_courses
  for all using (auth.uid() is not null) with check (auth.uid() is not null);
