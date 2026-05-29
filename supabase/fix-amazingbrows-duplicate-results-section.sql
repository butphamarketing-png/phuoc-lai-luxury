-- Xóa mục "Kết quả thực tế AMAZINGBROWS" bị lặp lần 2 (giữ block đầu + Video)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
        '(<h2>Kết quả thực tế AMAZINGBROWS</h2>(?:<p><img[^>]*></p>)+)<h2>Kết quả thực tế AMAZINGBROWS</h2>(?:<p><img[^>]*></p>)+',
        '\1',
        'i'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows'
  and coalesce(detail_json->>'bodyHtml', '') like '%<h2>Kết quả thực tế AMAZINGBROWS</h2>%'
  and (
    length(coalesce(detail_json->>'bodyHtml', ''))
    - length(
        replace(
          coalesce(detail_json->>'bodyHtml', ''),
          '<h2>Kết quả thực tế AMAZINGBROWS</h2>',
          ''
        )
      )
  ) / nullif(length('<h2>Kết quả thực tế AMAZINGBROWS</h2>'), 0) >= 2;

-- Kiểm tra: kết quả = 1
select
  slug,
  (
    length(coalesce(detail_json->>'bodyHtml', ''))
    - length(
        replace(
          coalesce(detail_json->>'bodyHtml', ''),
          '<h2>Kết quả thực tế AMAZINGBROWS</h2>',
          ''
        )
      )
  ) / nullif(length('<h2>Kết quả thực tế AMAZINGBROWS</h2>'), 0) as so_lan_ket_qua
from public.site_services
where slug = 'dieu-khac-soi-amazingbrows';
