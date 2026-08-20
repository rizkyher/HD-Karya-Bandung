-- Publish the latest service-cover photography as portfolio documentation.
-- The media rows already exist from migration 0009; fixed content IDs and
-- INSERT OR IGNORE keep this migration safe to run more than once.

INSERT OR IGNORE INTO content_items (id, kind, title, slug, category, status, featured, summary, body, data, seo_title, meta_description, canonical_url, index_status, published_at)
VALUES
  ('d8d89bd6-f892-4ecb-815d-5a8d22092ef7', 'PROYEK', 'Pengerjaan Furniture & Interior', 'pengerjaan-furniture-interior', 'Pengerjaan Furniture & Interior', 'PUBLISHED', 1, 'Dokumentasi pengerjaan furniture dan interior kantor.', '', json_object('cover_media_id', 'fe14813e-6f9c-46ee-8d89-a1231fdaed0f', 'portfolio_cover', 1), 'Pengerjaan Furniture & Interior | Jasa Perbaikan Bandung', 'Dokumentasi pengerjaan furniture dan interior kantor di Bandung.', '/portofolio/pengerjaan-furniture-interior', 'INDEX_FOLLOW', CURRENT_TIMESTAMP),
  ('02fe882c-f8ef-4565-a08d-6d21b9eb363e', 'PROYEK', 'Pemasangan Kaca Tempered', 'pemasangan-kaca-tempered', 'Pengerjaan Kaca Tempered', 'PUBLISHED', 1, 'Dokumentasi pemasangan kaca tempered untuk ruang usaha.', '', json_object('cover_media_id', '9bc9503a-2e3f-46be-b781-d6c2a010aa44', 'portfolio_cover', 1), 'Pemasangan Kaca Tempered | Jasa Perbaikan Bandung', 'Dokumentasi pemasangan kaca tempered untuk ruang usaha di Bandung.', '/portofolio/pemasangan-kaca-tempered', 'INDEX_FOLLOW', CURRENT_TIMESTAMP),
  ('ac2a2c96-8d76-4df4-b1a7-c02efeb7f154', 'PROYEK', 'Pengerjaan Huruf Timbul & Neon Box', 'pengerjaan-huruf-timbul-neon-box', 'Pengerjaan Huruf Timbul & Neonbox', 'PUBLISHED', 1, 'Dokumentasi pengerjaan huruf timbul dan neon box.', '', json_object('cover_media_id', 'edc203b9-98c5-4a12-b1fb-4c3a71f8c0a5', 'portfolio_cover', 1), 'Pengerjaan Huruf Timbul & Neon Box | Jasa Perbaikan Bandung', 'Dokumentasi pengerjaan huruf timbul dan neon box untuk identitas usaha.', '/portofolio/pengerjaan-huruf-timbul-neon-box', 'INDEX_FOLLOW', CURRENT_TIMESTAMP),
  ('0bb67f4a-4c90-4806-98eb-037b78e5ba57', 'PROYEK', 'Jasa Perbaikan Rumah/Kantor', 'jasa-perbaikan-rumah-kantor', 'Jasa Perbaikan Rumah/Kantor', 'PUBLISHED', 1, 'Dokumentasi perbaikan dan penataan ruang rumah atau kantor.', '', json_object('cover_media_id', '6a6f4862-53c5-4bdb-a4b9-88dd5b531b1c', 'portfolio_cover', 1), 'Jasa Perbaikan Rumah/Kantor | Jasa Perbaikan Bandung', 'Dokumentasi perbaikan dan penataan ruang rumah atau kantor di Bandung.', '/portofolio/jasa-perbaikan-rumah-kantor', 'INDEX_FOLLOW', CURRENT_TIMESTAMP);

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_category', 'Pengerjaan Furniture & Interior')
WHERE kind = 'LAYANAN' AND slug = 'furniture-interior';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_category', 'Pengerjaan Kaca Tempered')
WHERE kind = 'LAYANAN' AND slug = 'kaca-tempered';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_category', 'Pengerjaan Huruf Timbul & Neonbox')
WHERE kind = 'LAYANAN' AND slug = 'huruf-timbul-neonbox';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_category', 'Jasa Perbaikan Rumah/Kantor')
WHERE kind = 'LAYANAN' AND slug = 'perbaikan-rumah-kantor';
