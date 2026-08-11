# Database migrations

Migration yang sudah diterapkan di database produksi bersifat historis dan tidak boleh diubah atau diganti nama. Dua berkas bernomor `0004` tetap dipertahankan karena keduanya sudah tercatat sebagai diterapkan di produksi.

Untuk perubahan baru, gunakan nomor berikutnya setelah migrasi terakhir yang tercatat oleh `wrangler d1 migrations list`; migrasi terakhir saat ini adalah `0006`, sehingga migrasi baru dimulai dari `0007`. Selalu jalankan migrasi remote sebelum menerapkan Worker yang membutuhkan skema baru.
