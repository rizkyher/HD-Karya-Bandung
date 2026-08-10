UPDATE page_content
SET data = json_set(data, '$.heading', 'Perbaikan & renovasi di Bandung.'),
    updated_at = CURRENT_TIMESTAMP
WHERE key = 'hero';
