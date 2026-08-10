<script lang="ts">
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { form }: { form: { error?: string; reference?: string } | null } = $props();
</script>

<svelte:head>
  <title>Konsultasi Proyek | HD Karya Bandung</title>
  <meta name="description" content="Mulai konsultasi perbaikan, renovasi, atau interior bersama HD Karya Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <section class="page-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
      <div><p class="eyebrow text-clay">Konsultasi gratis</p><h1 class="section-title mt-5">Mari mulai dari kebutuhan yang paling penting.</h1><p class="mt-7 max-w-xl text-lg leading-8 text-forest">Ceritakan lokasi, jenis pekerjaan, dan gambaran waktunya. Tim HD Karya Bandung akan membantu mengarahkan percakapan pertama untuk rumah, kantor, atau tempat usaha Anda.</p><div class="mt-10 border-y border-stone py-6"><p class="font-bold">Agar percakapan lebih terarah</p><ul class="mt-4 grid gap-3 text-sm leading-6 text-forest"><li>Jenis ruang atau pekerjaan yang dibutuhkan</li><li>Lokasi proyek dan gambaran waktu</li><li>Hal yang paling ingin Anda perbaiki</li></ul></div></div>

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
  </main>
</PublicShell>
