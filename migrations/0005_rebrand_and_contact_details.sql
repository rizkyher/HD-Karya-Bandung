INSERT INTO site_settings (key, value, updated_at) VALUES
  ('company_name', 'Jasa Perbaikan Bandung', CURRENT_TIMESTAMP),
  ('phone', '081222336489', CURRENT_TIMESTAMP),
  ('whatsapp_number', '081222336489', CURRENT_TIMESTAMP),
  ('email', 'Jasaperbaikanbandung@gmail.com', CURRENT_TIMESTAMP),
  ('address', 'Jl. Mukodar Tengah No. 240, Cibeureum, Cimahi Selatan, Kota Cimahi', CURRENT_TIMESTAMP),
  ('default_title', 'Jasa Perbaikan Bandung', CURRENT_TIMESTAMP),
  ('default_meta_description', 'Jasa perbaikan, renovasi, interior, dan pengerjaan ruang di Bandung dan Cimahi.', CURRENT_TIMESTAMP)
ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP;

UPDATE page_content
SET data = REPLACE(data, 'HD Karya Bandung', 'Jasa Perbaikan Bandung'),
    updated_at = CURRENT_TIMESTAMP;

UPDATE content_items
SET seo_title = REPLACE(REPLACE(seo_title, 'HD Karya Bandung', 'Jasa Perbaikan Bandung'), 'HD Karya', 'Jasa Perbaikan Bandung'),
    meta_description = REPLACE(meta_description, 'HD Karya Bandung', 'Jasa Perbaikan Bandung'),
    updated_at = CURRENT_TIMESTAMP;
