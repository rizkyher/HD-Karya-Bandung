# Jasa Perbaikan Bandung

Website dan dashboard admin Jasa Perbaikan Bandung berbasis **SvelteKit**, **Tailwind
CSS v4**, dan Cloudflare Workers. Konten dan sesi disimpan di D1; berkas media
disimpan di R2.

## Jalankan lokal

```bash
npm install
npm run types
npm run dev
```

Untuk menguji aplikasi dengan binding D1/R2 lokal, gunakan Wrangler setelah
migrasi lokal telah diterapkan:

```bash
npm run d1:migrate:local
npx wrangler dev --local
```

Jangan pernah menyimpan kredensial produksi di file yang dikomit.

## Pemeriksaan

```bash
npm test
npm run check
npm run build
```

## Deploy

Worker memakai binding D1 `hd-karya-bandung` dan bucket R2
`hd-karya-media` yang sudah dikonfigurasi pada `wrangler.jsonc`.

```bash
npm run deploy
```

Setelah deploy, verifikasi beranda, `/robots.txt`, `/sitemap.xml`, dan login
admin pada domain Worker produksi.
