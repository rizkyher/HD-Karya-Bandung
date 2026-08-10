UPDATE page_content
SET data = REPLACE(data, 'jasa konstruksi, renovasi', 'perbaikan dan renovasi'),
    updated_at = CURRENT_TIMESTAMP
WHERE key = 'hero';

UPDATE content_items
SET category = 'Perbaikan & renovasi',
    updated_at = CURRENT_TIMESTAMP
WHERE category = 'Konstruksi & renovasi umum';
