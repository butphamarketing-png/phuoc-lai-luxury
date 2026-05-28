-- Fix ảnh bị lặp trong bài Điêu Khắc Sợi AMAZINGBROWS (chỉ XOÁ ảnh lặp)
-- Chạy trong Supabase → SQL Editor
--
-- Tác vụ:
-- - Nếu trong bodyHtml có ảnh 9197 bị lặp, giữ 1 và xoá phần lặp (dù thẻ img có khác chút)

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        coalesce(detail_json->>'bodyHtml', ''),
        '(<p>\\s*<img[^>]*src=\"/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f\\.jpg\"[^>]*>\\s*</p>)([\\s\\S]*?)<p>\\s*<img[^>]*src=\"/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f\\.jpg\"[^>]*>\\s*</p>',
        '\\1\\2',
        'g'
      )
    )
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows'
  and coalesce(detail_json->>'bodyHtml','') like '%/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f.jpg%';

-- Kiểm tra:
-- select slug, title, (detail_json->>'bodyHtml') like '%1779891799197%' as has_9197,
-- from public.site_services where slug='dieu-khac-soi-amazingbrows';

