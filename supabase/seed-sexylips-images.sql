-- Thêm ảnh phun-moi-sexylips vào bài Phun Môi SEXYLIPS (slug có sẵn)
-- Chạy trong Supabase → SQL Editor
-- Slug: phun-moi-sexylips (nếu bài cũ dùng slug "sexylips", sửa dòng WHERE bên dưới)

update public.site_services
set
  image_url = case
    when coalesce(image_url, '') = ''
      or image_url like '/service-%'
      or image_url not like '%phun-moi-sexylips%'
    then '/phun-moi-sexylips/1779892018057_239505211476377159_239505211476377159_f6f39731c264497ec62c256d97f1e808.jpg'
    else image_url
  end,
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(coalesce(detail_json->>'bodyHtml', '')) ||
      '<h2>Kết quả thực tế SEXYLIPS</h2>' ||
      '<p><img src="/phun-moi-sexylips/1779892018057_239505211476377159_239505211476377159_f6f39731c264497ec62c256d97f1e808.jpg" alt="Phun môi SEXYLIPS Phuoc Lai Luxury" /></p>' ||
      '<p><img src="/phun-moi-sexylips/1779892018049_239505211476377159_239505211476377159_c2985dccd2f4f51aaa469cae077de7fe.jpg" alt="SEXYLIPS môi tươi tắn" /></p>' ||
      '<p><img src="/phun-moi-sexylips/1779892018063_239505211476377159_239505211476377159_84a8b35ce3ed3a231ee71e34d4031db6.jpg" alt="Phun môi khử thâm Vũng Tàu" /></p>' ||
      '<p><img src="/phun-moi-sexylips/1779892017975_239505211476377159_239505211476377159_644df901c6d24df1def413d154cfd934.jpg" alt="SEXYLIPS before after" /></p>' ||
      '<p><img src="/phun-moi-sexylips/1779892018016_239505211476377159_239505211476377159_f7cd62300f42710d709d46c44f7ac2b5.jpg" alt="Phun môi chuyên nghiệp" /></p>' ||
      '<p><img src="/phun-moi-sexylips/1779892017999_239505211476377159_239505211476377159_0a6f28ea30a2352158ab11a0cb8b3175.jpg" alt="Môi SEXYLIPS tự nhiên" /></p>' ||
      '<p><img src="/phun-moi-sexylips/1779892018037_239505211476377159_239505211476377159_8e51f75d74913c7fb3ff38da7f0b553d.jpg" alt="Phun môi Vũng Tàu" /></p>' ||
      '<p><img src="/phun-moi-sexylips/1779892018028_239505211476377159_239505211476377159_ed8d22e21de85aa4e8758974c26dc9a9.jpg" alt="SEXYLIPS Phuoc Lai" /></p>'
    )
  ),
  updated_at = now()
where slug in ('phun-moi-sexylips', 'sexylips')
  and (
    detail_json is null
    or detail_json->>'bodyHtml' is null
    or detail_json->>'bodyHtml' not like '%/phun-moi-sexylips/%'
  );

-- Kiểm tra:
-- select slug, title, image_url from public.site_services where slug in ('phun-moi-sexylips', 'sexylips');
