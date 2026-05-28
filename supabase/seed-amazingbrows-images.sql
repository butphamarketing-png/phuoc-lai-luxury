-- Thêm ảnh amazingbrows vào bài Điêu Khắc Sợi AMAZINGBROWS (slug có sẵn)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  image_url = case
    when coalesce(image_url, '') = ''
      or image_url like '/service-%'
      or image_url not like '%amazingbrows%'
    then '/amazingbrows/1779891799209_239505211476377159_239505211476377159_c2ccdf600e9e39f028758255c7e53d0c.jpg'
    else image_url
  end,
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(coalesce(detail_json->>'bodyHtml', '')) ||
      '<h2>Video thực tế</h2>' ||
      '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/video-phunxam.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>' ||
      '<h2>Kết quả thực tế AMAZINGBROWS</h2>' ||
      '<p><img src="/amazingbrows/1779891799209_239505211476377159_239505211476377159_c2ccdf600e9e39f028758255c7e53d0c.jpg" alt="Điêu khắc sợi AMAZINGBROWS Phuoc Lai" /></p>' ||
      '<p><img src="/amazingbrows/1779891799181_239505211476377159_239505211476377159_bf185b26a2b860d779ec3318e78bed97.jpg" alt="AMAZINGBROWS sợi mày siêu thực" /></p>' ||
      '<p><img src="/amazingbrows/1779891799157_239505211476377159_239505211476377159_bb639d6381728c446a41e1181743e110.jpg" alt="Thiết kế mày AMAZINGBROWS" /></p>' ||
      '<p><img src="/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f.jpg" alt="Điêu khắc sợi Vũng Tàu" /></p>' ||
      '<p><img src="/amazingbrows/1779891799219_239505211476377159_239505211476377159_3c3fd6681107d69b9b5a483dd8628211.jpg" alt="Mày AMAZINGBROWS" /></p>' ||
      '<p><img src="/amazingbrows/1779891799228_239505211476377159_239505211476377159_a5e0590a5e82bf2fd540093258376935.jpg" alt="Phun mày sợi chuyên nghiệp" /></p>' ||
      '<p><img src="/amazingbrows/1779891799236_239505211476377159_239505211476377159_7a064e98915b0df43598a9e9ac341eb8.jpg" alt="AMAZINGBROWS Phuoc Lai Luxury" /></p>'
    )
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows'
  and (
    detail_json is null
    or detail_json->>'bodyHtml' is null
    or detail_json->>'bodyHtml' not like '%/amazingbrows/%'
    or detail_json->>'bodyHtml' not like '%/video-phunxam.mp4%'
  );

-- Kiểm tra (phải có 1 dòng):
-- select slug, title, image_url, left(detail_json->>'bodyHtml', 80) from public.site_services where slug = 'dieu-khac-soi-amazingbrows';
