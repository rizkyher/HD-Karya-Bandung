-- Replace four service covers with the latest client-supplied photography.
-- Fixed IDs and object keys keep the migration safe to apply repeatedly.

INSERT OR IGNORE INTO media (id, object_key, original_filename, content_type, size, width, height, alt, caption)
VALUES
  ('fe14813e-6f9c-46ee-8d89-a1231fdaed0f', 'media/fe14813e-6f9c-46ee-8d89-a1231fdaed0f.webp', 'furniture-interior.webp', 'image/webp', 42186, 1280, 961, 'Pengerjaan furniture dan interior kantor', 'Foto sampul layanan Pengerjaan Furniture & Interior.'),
  ('9bc9503a-2e3f-46be-b781-d6c2a010aa44', 'media/9bc9503a-2e3f-46be-b781-d6c2a010aa44.webp', 'kaca-tempered.webp', 'image/webp', 115876, 1080, 1080, 'Pemasangan kaca tempered', 'Foto sampul layanan Pengerjaan Kaca Tempered.'),
  ('edc203b9-98c5-4a12-b1fb-4c3a71f8c0a5', 'media/edc203b9-98c5-4a12-b1fb-4c3a71f8c0a5.webp', 'huruf-timbul-neonbox.webp', 'image/webp', 252852, 1350, 2400, 'Pengerjaan huruf timbul dan neon box', 'Foto sampul layanan Pengerjaan Huruf Timbul & Neon Box.'),
  ('6a6f4862-53c5-4bdb-a4b9-88dd5b531b1c', 'media/6a6f4862-53c5-4bdb-a4b9-88dd5b531b1c.webp', 'perbaikan-rumah-kantor.webp', 'image/webp', 86102, 1800, 1800, 'Perbaikan dan penataan ruang kantor', 'Foto sampul layanan Jasa Perbaikan Rumah/Kantor.');

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id', 'fe14813e-6f9c-46ee-8d89-a1231fdaed0f')
WHERE kind = 'LAYANAN' AND slug = 'furniture-interior';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id', '9bc9503a-2e3f-46be-b781-d6c2a010aa44')
WHERE kind = 'LAYANAN' AND slug = 'kaca-tempered';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id', 'edc203b9-98c5-4a12-b1fb-4c3a71f8c0a5')
WHERE kind = 'LAYANAN' AND slug = 'huruf-timbul-neonbox';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id', '6a6f4862-53c5-4bdb-a4b9-88dd5b531b1c')
WHERE kind = 'LAYANAN' AND slug = 'perbaikan-rumah-kantor';
