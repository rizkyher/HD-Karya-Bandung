-- Reuse the existing documentation media as portfolio covers. Safe to run repeatedly.
UPDATE content_items
SET data = json_remove(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_cover')
WHERE kind = 'PROYEK';

UPDATE content_items
SET canonical_url = replace(canonical_url, '/proyek/', '/portofolio/')
WHERE kind = 'PROYEK'
  AND canonical_url LIKE '%/proyek/%';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_cover', 1)
WHERE kind = 'PROYEK'
  AND title IN ('Basement DPRD Bandung', 'Buah Batu Regency', 'Pasang Jalur HDMI', 'PT. Pakar Biomedika Bandung');

UPDATE content_items
SET data = json_set(
  CASE WHEN json_valid(data) THEN data ELSE '{}' END,
  '$.cover_media_id', (SELECT json_extract(p.data, '$.cover_media_id') FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'Basement DPRD Bandung' LIMIT 1),
  '$.portfolio_category', 'Jasa Renovasi & Pengecatan Ulang'
)
WHERE kind = 'LAYANAN' AND slug = 'renovasi-pengecatan-ulang'
  AND EXISTS (SELECT 1 FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'Basement DPRD Bandung' AND json_extract(p.data, '$.cover_media_id') IS NOT NULL);

UPDATE content_items
SET data = json_set(
  CASE WHEN json_valid(data) THEN data ELSE '{}' END,
  '$.cover_media_id', (SELECT json_extract(p.data, '$.cover_media_id') FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'Buah Batu Regency' LIMIT 1),
  '$.portfolio_category', 'Jasa Perbaikan Lemari, Pintu, dan Meja Kayu'
)
WHERE kind = 'LAYANAN' AND slug = 'perbaikan-lemari-kayu'
  AND EXISTS (SELECT 1 FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'Buah Batu Regency' AND json_extract(p.data, '$.cover_media_id') IS NOT NULL);

UPDATE content_items
SET data = json_set(
  CASE WHEN json_valid(data) THEN data ELSE '{}' END,
  '$.cover_media_id', (SELECT json_extract(p.data, '$.cover_media_id') FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'Pasang Jalur HDMI' LIMIT 1),
  '$.portfolio_category', 'Jasa Instalasi/Relokasi Listrik'
)
WHERE kind = 'LAYANAN' AND slug = 'instalasi-relokasi-listrik'
  AND EXISTS (SELECT 1 FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'Pasang Jalur HDMI' AND json_extract(p.data, '$.cover_media_id') IS NOT NULL);

UPDATE content_items
SET data = json_set(
  CASE WHEN json_valid(data) THEN data ELSE '{}' END,
  '$.cover_media_id', (SELECT json_extract(p.data, '$.cover_media_id') FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'PT. Pakar Biomedika Bandung' LIMIT 1),
  '$.portfolio_category', 'Pengerjaan Kusen Aluminium'
)
WHERE kind = 'LAYANAN' AND slug = 'kusen-aluminium'
  AND EXISTS (SELECT 1 FROM content_items p WHERE p.kind = 'PROYEK' AND p.title = 'PT. Pakar Biomedika Bandung' AND json_extract(p.data, '$.cover_media_id') IS NOT NULL);
