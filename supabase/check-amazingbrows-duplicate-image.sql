-- Kiểm tra ảnh 9197 có bị lặp trong bài Điêu Khắc Sợi AMAZINGBROWS không
-- Chạy trong Supabase → SQL Editor

select
  slug,
  title,
  (
    length(coalesce(detail_json->>'bodyHtml', ''))
    - length(
        replace(
          coalesce(detail_json->>'bodyHtml', ''),
          '/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f.jpg',
          ''
        )
      )
  )
  / nullif(
    length('/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f.jpg'),
    0
  ) as so_lan_anh_9197
from public.site_services
where slug = 'dieu-khac-soi-amazingbrows';

-- so_lan_anh_9197 = 1 → OK (không lặp)
-- so_lan_anh_9197 >= 2 → còn lặp → chạy fix-amazingbrows-duplicate-image.sql
