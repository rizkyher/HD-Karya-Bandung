-- Keep home and office repairs as portfolio documentation under the broader
-- renovation category, and use its newer photo as the category cover.

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_cover', 0)
WHERE kind = 'PROYEK' AND title = 'Basement DPRD Bandung';

UPDATE content_items
SET category = 'Jasa Renovasi & Pengecatan Ulang',
    data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_cover', 1)
WHERE kind = 'PROYEK' AND slug = 'jasa-perbaikan-rumah-kantor';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.portfolio_category', 'Jasa Renovasi & Pengecatan Ulang')
WHERE kind = 'LAYANAN' AND slug = 'perbaikan-rumah-kantor';
