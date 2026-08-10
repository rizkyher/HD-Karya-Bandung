# HD Karya Bandung

Website dan admin aplikasi Cloudflare Workers untuk HD Karya Bandung. Implementasi mengikuti `ADMIN.md` dan `SEO.md`: konten tersimpan di D1, media di R2, admin berbasis role, serta halaman publik dan SEO dirender oleh Worker.

## Jalankan lokal

```bash
npm install
npm run types
npm run d1:migrate:local
npx wrangler dev --local \
  --var BOOTSTRAP_ADMIN_EMAIL:admin@local.test \
  --var BOOTSTRAP_ADMIN_PASSWORD:gunakan-password-lokal-minimum-12
```

Buka `/admin/login`. Bootstrap hanya membuat akun `SUPER_ADMIN` pertama bila tabel pengguna masih kosong. Jangan pernah menyimpan password produksi di file yang dikomit.

## Cek kualitas

```bash
npm run typecheck
npm test
npm audit --omit=dev
```

## Siapkan produksi

1. Buat database D1: `npx wrangler d1 create hd-karya-bandung`, lalu ganti `database_id` placeholder di [wrangler.jsonc](./wrangler.jsonc).
2. Buat bucket R2: `npx wrangler r2 bucket create hd-karya-media`.
3. Set akun admin awal sekali saja dengan `npx wrangler secret put BOOTSTRAP_ADMIN_EMAIL` dan `npx wrangler secret put BOOTSTRAP_ADMIN_PASSWORD`.
4. Jalankan `npx wrangler d1 migrations apply hd-karya-bandung --remote`.
5. Deploy dengan `npx wrangler deploy`.

Setelah akun pertama terbuat, hapus kedua bootstrap secret agar endpoint produksi tidak lagi memiliki kredensial bootstrap.
