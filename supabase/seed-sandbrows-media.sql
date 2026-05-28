-- Phun Mày SANDBROWS — thêm hình + video (dùng assets /sandbrows/*)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  image_url = case
    when coalesce(image_url, '') = ''
      or image_url like '/service-%'
    then '/sandbrows/1779969967771_239505211476377159_239505211476377159_a6f9558102d79440aadb9364e06ec86d.jpg'
    else image_url
  end,
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(coalesce(detail_json->>'bodyHtml', '')) ||
      '<h2>Video thực tế SANDBROWS</h2>' ||
      '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/sandbrows/1779969967822_239505211476377159_239505211476377159.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>' ||
      '<h2>Kết quả thực tế SANDBROWS</h2>' ||
      '<p><img src="/sandbrows/1779969967771_239505211476377159_239505211476377159_a6f9558102d79440aadb9364e06ec86d.jpg" alt="Phun mày SANDBROWS" /></p>' ||
      '<p><img src="/sandbrows/1779969967795_239505211476377159_239505211476377159_70a5c431cf13d0d5a89a00d789c911e7.jpg" alt="Dáng mày SANDBROWS tự nhiên" /></p>' ||
      '<p><img src="/sandbrows/1779969967810_239505211476377159_239505211476377159_d66d6011310b12970dd5fd90516a2915.jpg" alt="Kết quả SANDBROWS" /></p>'
    ),
    true
  ),
  updated_at = now()
where slug in ('phun-may-sandbrows', 'sandbrows');

