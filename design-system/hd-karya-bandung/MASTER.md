# Design System — Jasa Perbaikan Bandung

## Tujuan

Situs publik harus terasa tenang, tegas, dan dapat dipercaya untuk layanan
perbaikan, renovasi, interior, serta kebutuhan ruang. Admin adalah ruang kerja
yang lebih fungsional dan tidak memakai motion dekoratif.

Prioritas: informasi mudah dipindai, tindakan konsultasi jelas, aksesibilitas,
dan performa mobile. Jangan membuat klaim portofolio, testimoni, sertifikasi,
atau detail layanan yang tidak ada di konten terbit.

## Token yang berlaku

Token didefinisikan di `src/app.css` dan harus digunakan alih-alih membuat
warna atau font baru di komponen.

| Peran | Token |
| --- | --- |
| Latar utama | `cloud` |
| Teks/permukaan gelap | `ink` |
| Teks pendukung | `forest` |
| Permukaan gelap alternatif | `spruce` |
| Aksi utama | `clay` |
| Permukaan tenang | `mist` |
| Garis pembatas | `stone` |
| Font isi | DM Sans |
| Font judul | Libre Franklin |

Gunakan `page-shell` untuk lebar konten, `page-title` dan `section-title` untuk
hierarki judul, serta `eyebrow` untuk label bagian.

## Tata letak dan komponen

- Gunakan bidang terang, aturan/border tipis, dan komposisi editorial; hindari
  kartu generik dengan radius besar atau bayangan berlapis.
- Satu tindakan utama per area. Gunakan `button-primary` untuk aksi konversi,
  `button-secondary` untuk pilihan pendukung, dan `text-link` untuk navigasi
  kontekstual.
- Kontrol interaktif minimum 44 px, punya focus ring yang terlihat, dan tidak
  hanya bergantung pada hover.
- Navigasi desktop tampil mulai `md`; pada layar kecil gunakan menu overlay
  dengan tombol buka/tutup yang memiliki nama aksesibel.
- Dock tindakan mobile berisi WhatsApp dan konsultasi. Jangan menambahkan aksi
  ketiga tanpa meninjau kepadatan layar kecil.
- Gambar konten harus punya alt text yang sesuai. Saat masih ilustrasi, tampilkan
  label bahwa gambar bukan dokumentasi proyek.

## Motion dan scroll

- Animasi hanya menggunakan opacity dan transform, dengan ritme cepat dan
  `--ease-out-expo`.
- Hormati `prefers-reduced-motion`; jangan menambah animasi yang memblokir
  navigasi atau input.
- Lenis hanya dibuat satu kali oleh `SmoothScroll.svelte` dengan `autoRaf` dan
  anchor offset. Jangan menambahkan loop `requestAnimationFrame` lain.
- Menu atau area berscroll internal harus memakai `data-lenis-prevent`.
- Tombol kembali ke atas hanya muncul setelah pengguna benar-benar menggulir.

## Aksesibilitas dan kualitas

- Gunakan landmark semantik, urutan heading logis, label formulir nyata, dan
  `aria-current` untuk rute aktif.
- Pastikan tidak ada scroll horizontal pada 375 px, 768 px, 1024 px, dan 1440
  px.
- Hindari gradient dekoratif, emoji sebagai ikon struktural, `transition: all`,
  dan warna baru yang tidak memakai token.
- Uji perubahan UI dengan `npm run check`, build produksi, dan browser pada
  mobile serta desktop.
