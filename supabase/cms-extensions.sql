-- Đánh giá, khách hàng (liên hệ), cài đặt website
-- Chạy sau setup.sql trong Supabase SQL Editor

-- -----------------------------------------------------------------------------
-- Đánh giá / Feedback
-- -----------------------------------------------------------------------------

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

create index if not exists idx_site_reviews_status_sort
  on public.site_reviews (status, sort_order);

-- -----------------------------------------------------------------------------
-- Khách hàng / yêu cầu liên hệ
-- -----------------------------------------------------------------------------

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

create index if not exists idx_site_customers_status_created
  on public.site_customers (status, created_at desc);

-- -----------------------------------------------------------------------------
-- Cài đặt website (1 dòng)
-- -----------------------------------------------------------------------------

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
    "siteName": "Phuoc Lai Luxury"
  }'::jsonb
)
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- Triggers updated_at
-- -----------------------------------------------------------------------------

drop trigger if exists trg_site_reviews_updated on public.site_reviews;
create trigger trg_site_reviews_updated
  before update on public.site_reviews
  for each row execute function public.set_updated_at();

drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- RLS
-- -----------------------------------------------------------------------------

alter table public.site_reviews enable row level security;
alter table public.site_customers enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "site_reviews_select" on public.site_reviews;
create policy "site_reviews_select" on public.site_reviews
  for select
  using (status = 'published' or auth.uid() is not null);

drop policy if exists "site_reviews_insert" on public.site_reviews;
create policy "site_reviews_insert" on public.site_reviews
  for insert to authenticated
  with check (auth.uid() is not null);

drop policy if exists "site_reviews_update" on public.site_reviews;
create policy "site_reviews_update" on public.site_reviews
  for update to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "site_reviews_delete" on public.site_reviews;
create policy "site_reviews_delete" on public.site_reviews
  for delete to authenticated
  using (auth.uid() is not null);

drop policy if exists "site_customers_select" on public.site_customers;
create policy "site_customers_select" on public.site_customers
  for select to authenticated
  using (auth.uid() is not null);

drop policy if exists "site_customers_insert_public" on public.site_customers;
create policy "site_customers_insert_public" on public.site_customers
  for insert to anon, authenticated
  with check (true);

drop policy if exists "site_customers_update" on public.site_customers;
create policy "site_customers_update" on public.site_customers
  for update to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "site_customers_delete" on public.site_customers;
create policy "site_customers_delete" on public.site_customers
  for delete to authenticated
  using (auth.uid() is not null);

drop policy if exists "site_settings_select" on public.site_settings;
create policy "site_settings_select" on public.site_settings
  for select
  using (true);

drop policy if exists "site_settings_insert" on public.site_settings;
create policy "site_settings_insert" on public.site_settings
  for insert to authenticated
  with check (auth.uid() is not null);

drop policy if exists "site_settings_update" on public.site_settings;
create policy "site_settings_update" on public.site_settings
  for update to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

grant select on public.site_reviews to anon, authenticated;
grant select on public.site_settings to anon, authenticated;
grant insert on public.site_customers to anon, authenticated;
grant select, update, delete on public.site_customers to authenticated;
grant insert, update, delete on public.site_reviews to authenticated;
grant insert, update, delete on public.site_settings to authenticated;
