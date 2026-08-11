UPDATE content_items
SET category = 'Interior & reparasi berbagai furniture kayu',
    summary = 'Reparasi berbagai furniture kayu yang rusak, lapuk, atau terkena rayap.',
    body = 'Reparasi berbagai furniture kayu yang rusak, lapuk, atau terkena rayap agar kembali kokoh, fungsional, dan tampak seperti baru.',
    data = '{"suitable_for":"Lemari kayu pada hunian dan ruang usaha","scope":"Reparasi furniture kayu; perbaikan kerusakan; penanganan rayap"}',
    meta_description = 'Reparasi berbagai furniture kayu yang rusak, lapuk, atau terkena rayap di Bandung.',
    updated_at = CURRENT_TIMESTAMP
WHERE kind = 'LAYANAN' AND slug = 'perbaikan-lemari-kayu';

UPDATE content_items
SET category = 'Interior & reparasi berbagai furniture kayu',
    updated_at = CURRENT_TIMESTAMP
WHERE kind = 'LAYANAN' AND slug = 'furniture-interior';
