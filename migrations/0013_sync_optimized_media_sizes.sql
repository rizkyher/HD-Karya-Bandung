-- Keep Media Library metadata aligned with the optimized R2 WebP objects.

UPDATE media
SET size = CASE id
  WHEN '9dbd16e0-abe9-4f36-8805-f394448a6e80' THEN 122240
  WHEN '943bae71-2609-4209-98ae-ea0397a3c699' THEN 78296
  WHEN '3adc52e7-def0-42bc-8413-bc0ec5879dc3' THEN 116514
  WHEN '424a0642-e581-48fe-a36e-97a5f0ce2d08' THEN 13690
  WHEN '497e6179-53fe-49af-b2ed-1ab0e49b8106' THEN 55410
  WHEN '766a01c8-6774-4185-9465-c69cde7bd77f' THEN 34140
  WHEN '554f3fdb-e214-49b5-b9fc-6b6d57d1b002' THEN 16544
END
WHERE id IN (
  '9dbd16e0-abe9-4f36-8805-f394448a6e80',
  '943bae71-2609-4209-98ae-ea0397a3c699',
  '3adc52e7-def0-42bc-8413-bc0ec5879dc3',
  '424a0642-e581-48fe-a36e-97a5f0ce2d08',
  '497e6179-53fe-49af-b2ed-1ab0e49b8106',
  '766a01c8-6774-4185-9465-c69cde7bd77f',
  '554f3fdb-e214-49b5-b9fc-6b6d57d1b002'
);
