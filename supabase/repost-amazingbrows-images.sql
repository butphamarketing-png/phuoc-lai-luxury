-- Đăng lại 6 ảnh AMAZINGBROWS vào bài dieu-khac-soi-amazingbrows
-- (Thay gallery cũ nếu đã có, giữ phần Video thực tế)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  image_url = '/amazingbrows/1779891799157_239505211476377159_239505211476377159_bb639d6381728c446a41e1181743e110.jpg',
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(
        regexp_replace(
          replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
          '<h2>Kết quả thực tế AMAZINGBROWS</h2>(?:\s*<p>\s*<img[^>]*>\s*</p>\s*)+',
          '',
          'gi'
        )
      ) ||
      '<h2>Kết quả thực tế AMAZINGBROWS</h2>' ||
      '<p><img src="/amazingbrows/1779891799157_239505211476377159_239505211476377159_bb639d6381728c446a41e1181743e110.jpg" alt="Thiết kế mày AMAZINGBROWS" /></p>' ||
      '<p><img src="/amazingbrows/1779891799181_239505211476377159_239505211476377159_bf185b26a2b860d779ec3318e78bed97.jpg" alt="AMAZINGBROWS sợi mày siêu thực" /></p>' ||
      '<p><img src="/amazingbrows/1779891799209_239505211476377159_239505211476377159_c2ccdf600e9e39f028758255c7e53d0c.jpg" alt="Điêu khắc sợi AMAZINGBROWS Phuoc Lai" /></p>' ||
      '<p><img src="/amazingbrows/1779891799228_239505211476377159_239505211476377159_a5e0590a5e82bf2fd540093258376935.jpg" alt="Phun mày sợi chuyên nghiệp" /></p>' ||
      '<p><img src="/amazingbrows/1779891799236_239505211476377159_239505211476377159_7a064e98915b0df43598a9e9ac341eb8.jpg" alt="AMAZINGBROWS Phuoc Lai Luxury" /></p>' ||
      '<p><img src="/amazingbrows/Permanent Makeup.jpg" alt="Permanent Makeup AMAZINGBROWS" /></p>'
    ),
    true
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows';

-- Kiểm tra
select
  slug,
  image_url,
  (
    select count(*)
    from regexp_matches(
      coalesce(detail_json->>'bodyHtml', ''),
      '/amazingbrows/',
      'g'
    )
  ) as so_anh_amazingbrows
from public.site_services
where slug = 'dieu-khac-soi-amazingbrows';

-- Kỳ vọng: so_anh_amazingbrows = 6
