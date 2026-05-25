-- Xóa toàn bộ dịch vụ & khóa đào tạo hiện có trên Supabase.
-- Chạy trong Supabase → SQL Editor (sau khi đã chạy setup.sql).

DELETE FROM public.site_services;
DELETE FROM public.site_training_courses;
