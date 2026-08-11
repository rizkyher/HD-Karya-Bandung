<script lang="ts">
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { form }: { form: { error?: string; reference?: string } | null } = $props();
</script>

<svelte:head>
  <title>Kontak | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Hubungi Jasa Perbaikan Bandung untuk konsultasi perbaikan, renovasi, atau interior." />
</svelte:head>

<PublicShell>
  <main id="content">
    <section class="page-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
      <div><p class="eyebrow text-clay">Konsultasi gratis</p><h1 class="section-title mt-5">Mari mulai dari kebutuhan yang paling penting.</h1><p class="mt-7 max-w-xl text-lg leading-8 text-forest">Ceritakan lokasi, jenis pekerjaan, dan gambaran waktunya. Jasa Perbaikan Bandung akan membantu mengarahkan percakapan pertama untuk rumah, kantor, atau tempat usaha Anda.</p><div class="mt-10 border-y border-stone py-6"><p class="font-bold">Hubungi kami langsung</p><address class="mt-4 grid gap-3 text-sm leading-6 text-forest not-italic"><a class="text-link w-fit" href="https://wa.me/6281222336489" target="_blank" rel="noreferrer">WhatsApp 081222336489 ↗</a><a class="text-link w-fit" href="mailto:Jasaperbaikanbandung@gmail.com">Jasaperbaikanbandung@gmail.com</a><span>Jl. Mukodar Tengah No. 240, Cibeureum, Cimahi Selatan, Kota Cimahi</span></address></div><div class="mt-10 border-y border-stone py-6"><p class="font-bold">Agar percakapan lebih terarah</p><ul class="mt-4 grid gap-3 text-sm leading-6 text-forest"><li>Jenis ruang atau pekerjaan yang dibutuhkan</li><li>Lokasi proyek dan gambaran waktu</li><li>Hal yang paling ingin Anda perbaiki</li></ul></div></div>

      <form method="POST" class="grid gap-6 border border-stone bg-white p-6 sm:p-8" aria-label="Formulir konsultasi proyek">
        <div><p class="eyebrow text-clay">Formulir singkat</p><p class="mt-3 text-sm leading-6 text-forest">Kami menggunakan informasi ini hanya untuk menindaklanjuti kebutuhan proyek Anda.</p></div>
        {#if form?.reference}<div class="border border-spruce bg-mist p-4 text-sm" role="status"><strong>Inquiry terkirim.</strong><p class="mt-1">Simpan referensi <strong>{form.reference}</strong>. Tim kami akan menindaklanjuti melalui nomor yang Anda berikan.</p></div>{:else if form?.error}<p class="border border-red-800 bg-red-50 p-4 text-sm text-red-900" role="alert">{form.error}</p>{/if}
        <div class="grid gap-5 sm:grid-cols-2"><label class="grid gap-2 text-sm font-bold">Nama<input class="field-input" name="name" autocomplete="name" placeholder="Nama Anda" required /></label><label class="grid gap-2 text-sm font-bold">Nomor WhatsApp<input class="field-input" name="phone" type="tel" autocomplete="tel" placeholder="08xx xxxx xxxx" required /></label></div>
        <label class="grid gap-2 text-sm font-bold">Email <span class="font-normal text-forest">(opsional)</span><input class="field-input" name="email" type="email" autocomplete="email" placeholder="nama@email.com" /></label>
        <label class="grid gap-2 text-sm font-bold">Jenis pekerjaan<select class="field-input" name="service"><option value="">Pilih bila sudah tahu</option><option>Jasa Perbaikan Rumah/Kantor</option><option>Jasa Renovasi & Pengecatan Ulang</option><option>Jasa Perbaikan Lemari Kayu</option><option>Jasa Instalasi/Relokasi Listrik</option><option>Jasa Instalasi AC & CCTV</option><option>Pengerjaan Kusen Aluminium</option><option>Pengerjaan Kaca Tempered</option><option>Pengerjaan Huruf Timbul & Neonbox</option><option>Pengerjaan Stainless Steel & Besi</option><option>Pengerjaan Furniture & Interior</option><option>Pengerjaan Kaca Grafir, Etsa, dan Inlay</option></select></label>
        <label class="grid gap-2 text-sm font-bold">Ceritakan kebutuhan Anda<textarea class="field-input min-h-40 resize-y" name="message" placeholder="Contoh: renovasi dapur rumah di Bandung, target mulai bulan depan." required></textarea></label>
        <button class="button-primary w-full sm:w-fit">Kirim inquiry <span aria-hidden="true">↗</span></button>
      </form>
    </section>

    <section class="border-t border-stone bg-mist py-16 sm:py-20" aria-labelledby="location-heading">
      <div class="page-shell grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div><p class="eyebrow text-clay">Lokasi</p><h2 id="location-heading" class="section-title mt-5">Temukan kami di Cimahi Selatan.</h2><p class="mt-5 max-w-md leading-7 text-forest">Jl. Mukodar Tengah No. 240, Cibeureum, Cimahi Selatan, Kota Cimahi.</p></div>
        <iframe class="aspect-[4/3] w-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4517.831502795082!2d107.56225317555824!3d-6.909896693089552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e5e784c19e15%3A0xfb0e1fd4023c334b!2sJl.%20Mukodar%20Tengah%20No.240%2C%20Cibeureum%2C%20Kec.%20Cimahi%20Sel.%2C%20Kota%20Cimahi%2C%20Jawa%20Barat%2040535%2C%20Indonesia!5e1!3m2!1sid!2ssg!4v1786409823015!5m2!1sid!2ssg" title="Peta Jasa Perbaikan Bandung" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </section>
  </main>
</PublicShell>
