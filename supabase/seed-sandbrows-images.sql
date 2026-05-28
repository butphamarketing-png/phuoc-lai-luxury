-- Thêm ảnh phun-may-sandbrows vào bài Phun Mày SANDBROWS (slug có sẵn)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  image_url = case
    when coalesce(image_url, '') = ''
      or image_url like '/service-%'
      or image_url not like '%phun-may-sandbrows%'
    then '/phun-may-sandbrows/1779893218518_239505211476377159_239505211476377159_094d13aecf15af4996e63b5c6c48fa59.jpg'
    else image_url
  end,
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(coalesce(detail_json->>'bodyHtml', '')) ||
      '<h2>Kết quả thực tế SANDBROWS</h2>' ||
      '<p><img src="/phun-may-sandbrows/1779893218518_239505211476377159_239505211476377159_094d13aecf15af4996e63b5c6c48fa59.jpg" alt="Phun mày SANDBROWS trước và sau" /></p>' ||
      '<p><img src="/phun-may-sandbrows/1779893218482_239505211476377159_239505211476377159_098ddbcbf5fff04d4d1b6505e9f1b4a0.jpg" alt="Phun mày SANDBROWS kết quả" /></p>' ||
      '<p><img src="/phun-may-sandbrows/1779893218504_239505211476377159_239505211476377159_117ec637b877219272c735463120da06.jpg" alt="Dáng mày SANDBROWS tự nhiên" /></p>'
    )
  ),
  updated_at = now()
where slug in ('phun-may-sandbrows', 'sandbrows')
  and (
    detail_json is null
    or detail_json->>'bodyHtml' is null
    or detail_json->>'bodyHtml' not like '%/phun-may-sandbrows/%'
  );

-- Kiểm tra:
-- select slug, title, image_url from public.site_services where slug in ('phun-may-sandbrows','sandbrows');
