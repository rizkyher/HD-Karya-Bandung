# Jasa Perbaikan Bandung

Website publik dan workspace admin untuk Jasa Perbaikan Bandung. Aplikasi ini
dibangun dengan SvelteKit, Tailwind CSS v4, dan Cloudflare Workers. Konten,
akun, sesi, serta inquiry disimpan di D1; media diunggah ke R2.

Produksi: <https://hd-karya-bandung.rizkyherdiansyah31.workers.dev>

## Yang tersedia

- Halaman publik untuk layanan, proyek, galeri, artikel, testimoni, klien dan
  partner, sertifikasi, profil, serta kontak.
- Form inquiry dengan pembatasan penyalahgunaan dan alur tindak lanjut di
  admin.
- Admin berperan untuk mengelola konten, media, pengaturan, pengguna, dan audit
  log sesuai otorisasinya.
- Tur admin bertahap untuk mengenalkan menu dan isian utama.
- Navigasi mobile yang aksesibel, aksi cepat WhatsApp/konsultasi, dan smooth
  scrolling Lenis yang menghormati pengaturan reduced motion.

## Menjalankan lokal

```bash
npm ci
npm run types
npm run dev
```

Untuk menjalankan Worker dengan binding D1 dan R2 lokal:

```bash
npm run d1:migrate:local
npx wrangler dev --local
```

Jangan menyimpan kredensial produksi di file yang dikomit. Binding produksi
ditentukan di `wrangler.jsonc`.

## Perintah penting

| Perintah | Kegunaan |
| --- | --- |
| `npm test` | Menjalankan regresi aplikasi dan keamanan dasar. |
| `npm run check` | Menjalankan sinkronisasi SvelteKit dan pemeriksaan tipe. |
| `npm run build` | Membuat build produksi Cloudflare Worker. |
| `npm audit --omit=dev` | Memeriksa kerentanan dependensi produksi. |
| `npm run d1:migrate:local` | Menerapkan migrasi ke D1 lokal. |
| `npm run deploy` | Build dan deploy Worker produksi. |

## Struktur penting

- `src/routes/`: halaman publik, endpoint SEO, login, dan route admin.
- `src/lib/components/`: shell publik/admin, kartu konten, pemilih media, dan
  tur admin.
- `src/lib/server/`: akses D1/R2, autentikasi, konten, inquiry, dan media.
- `migrations/`: riwayat skema dan seed D1.
- `tests/`: pengujian routing, izin, keamanan, dan fondasi UI.

## Rilis

Sebelum deploy, jalankan `npm test`, `npm run check`, `npm run build`, dan
`npm audit --omit=dev`. Setelah deploy, periksa beranda, menu mobile,
`/robots.txt`, `/sitemap.xml`, serta login admin di domain produksi.

Lihat [MIGRATIONS.md](MIGRATIONS.md) untuk aturan migrasi dan
[`design-system/hd-karya-bandung/MASTER.md`](design-system/hd-karya-bandung/MASTER.md)
untuk arah desain yang berlaku.
