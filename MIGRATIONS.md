# Database migrations

Migrasi produksi adalah riwayat permanen: jangan mengubah, memindahkan, atau
mengganti nama berkas yang pernah diterapkan. Khusus nomor `0004`, dua berkas
tetap dipertahankan karena keduanya sudah tercatat di produksi.

## Riwayat saat ini

| Nomor | Tujuan |
| --- | --- |
| `0001` | Skema awal. |
| `0002` | Konten profil perusahaan dan katalog layanan. |
| `0003` | Judul hero yang lebih ringkas. |
| `0004` | Penyelarasan copy layanan dan penggantian istilah layanan kayu. |
| `0005` | Identitas merek dan detail kontak. |
| `0006` | Pengamanan dan pembatasan inquiry. |

## Menambah migrasi

1. Periksa riwayat remote dengan `wrangler d1 migrations list hd-karya-bandung`.
2. Gunakan nomor berikutnya yang belum tercatat; setelah `0006`, nomor kandidat
   berikutnya adalah `0007`.
3. Uji di lokal dengan `npm run d1:migrate:local`.
4. Terapkan migrasi remote sebelum deploy Worker yang membutuhkan skema baru.
5. Jangan mereset D1 produksi atau mengedit migrasi historis.
