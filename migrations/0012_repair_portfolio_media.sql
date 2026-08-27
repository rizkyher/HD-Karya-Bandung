-- Reuse the optimized WebP objects seeded by migration 0008 and retire only
-- duplicate rows whose object uploads never completed.

UPDATE media SET size = 52380 WHERE id = 'd3197762-b7c4-49aa-bed8-fb6f3422ff9a';
UPDATE media SET size = 36024 WHERE id = 'acf726a3-d17a-4050-ae3c-7b7a6b167c80';
UPDATE media SET size = 205230 WHERE id = '987d5f5e-452e-46d0-aa21-6a3d28cc37df';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id',
  CASE slug
    WHEN 'pasang-jalur-hdmi' THEN 'd3197762-b7c4-49aa-bed8-fb6f3422ff9a'
    WHEN 'ganti-instalasi-baru' THEN '9dbd16e0-abe9-4f36-8805-f394448a6e80'
    WHEN 'penambahan-jalur-saklar' THEN '943bae71-2609-4209-98ae-ea0397a3c699'
    WHEN 'pemisahan-meteran-phasa' THEN '3adc52e7-def0-42bc-8413-bc0ec5879dc3'
    WHEN 'relokasi-saklar-stop-kontak' THEN '424a0642-e581-48fe-a36e-97a5f0ce2d08'
  END)
WHERE kind = 'PROYEK' AND slug IN (
  'pasang-jalur-hdmi',
  'ganti-instalasi-baru',
  'penambahan-jalur-saklar',
  'pemisahan-meteran-phasa',
  'relokasi-saklar-stop-kontak'
);

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id',
  CASE slug
    WHEN 'pt-pakar-biomedika-bandung' THEN 'acf726a3-d17a-4050-ae3c-7b7a6b167c80'
    WHEN 'sdn-geger-kalong' THEN '497e6179-53fe-49af-b2ed-1ab0e49b8106'
    WHEN 'sdn-geger-kalong-bandung' THEN '766a01c8-6774-4185-9465-c69cde7bd77f'
    WHEN 'ruang-beria-rs-imannuel' THEN '554f3fdb-e214-49b5-b9fc-6b6d57d1b002'
    WHEN 'pt-daya-mulia-turangga-kusen' THEN '987d5f5e-452e-46d0-aa21-6a3d28cc37df'
  END)
WHERE kind = 'PROYEK' AND slug IN (
  'pt-pakar-biomedika-bandung',
  'sdn-geger-kalong',
  'sdn-geger-kalong-bandung',
  'ruang-beria-rs-imannuel',
  'pt-daya-mulia-turangga-kusen'
);

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id', 'd3197762-b7c4-49aa-bed8-fb6f3422ff9a')
WHERE kind = 'LAYANAN' AND slug = 'instalasi-relokasi-listrik';

UPDATE content_items
SET data = json_set(CASE WHEN json_valid(data) THEN data ELSE '{}' END, '$.cover_media_id', 'acf726a3-d17a-4050-ae3c-7b7a6b167c80')
WHERE kind = 'LAYANAN' AND slug = 'kusen-aluminium';

UPDATE content_items
SET status = 'ARCHIVED', updated_at = CURRENT_TIMESTAMP
WHERE kind = 'PROYEK' AND slug IN (
  'rs-imannuel-bandung',
  'rs-imannuel-bandung-koridor',
  'pt-daya-mulia-turangga-aluminium'
);
