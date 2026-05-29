-- Sửa ảnh lỗi trang AMAZINGBROWS for men (/dich-vu/amazingbrows-for-men)
-- Chuẩn hóa đường dẫn ảnh → /amazingbrows-for-men/ (file tĩnh trên Vercel)
-- Chạy trong Supabase → SQL Editor, sau đó hard refresh trang (Ctrl+F5).

update public.site_services
set
  image_url = replace(
    replace(coalesce(image_url, ''), '/for men/', '/amazingbrows-for-men/'),
    '/phun-may-sandbrows/',
    '/amazingbrows-for-men/'
  ),
  detail_json = jsonb_set(
    jsonb_set(
      coalesce(detail_json, '{}'::jsonb),
      '{image}',
      to_jsonb(
        replace(
          replace(
            coalesce(detail_json->>'image', image_url, ''),
            '/for men/',
            '/amazingbrows-for-men/'
          ),
          '/phun-may-sandbrows/',
          '/amazingbrows-for-men/'
        )
      ),
      true
    ),
    '{bodyHtml}',
    to_jsonb(
      replace(
        replace(
          coalesce(detail_json->>'bodyHtml', ''),
          '/for men/',
          '/amazingbrows-for-men/'
        ),
        '/phun-may-sandbrows/',
        '/amazingbrows-for-men/'
      )
    ),
    true
  ),
  updated_at = now()
where slug in ('amazingbrows-for-men', 'phun-may-sandbrows')
   or title ilike '%AMAZINGBROWS for men%';

update public.site_services old_row
set slug = 'amazingbrows-for-men', updated_at = now()
where old_row.slug = 'phun-may-sandbrows'
  and not exists (
    select 1 from public.site_services x where x.slug = 'amazingbrows-for-men'
  );

select
  slug,
  title,
  image_url,
  (
    length(coalesce(detail_json->>'bodyHtml', ''))
    - length(
        replace(
          coalesce(detail_json->>'bodyHtml', ''),
          '/amazingbrows-for-men/1779893218518',
          ''
        )
      )
  ) / nullif(length('/amazingbrows-for-men/1779893218518'), 0) as co_anh_8518
from public.site_services
where slug = 'amazingbrows-for-men';
