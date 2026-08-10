<script lang="ts">
  import PublicShell from '$lib/components/PublicShell.svelte';
  import ContentGrid from '$lib/components/ContentGrid.svelte';
  let { data }: { data: import('./$types').PageData } = $props();
  let hero = $derived(data.homepage.hero ?? {});
</script>

<svelte:head>
  <title>Jasa Konstruksi & Renovasi Bandung | HD Karya Bandung</title>
  <meta name="description" content="Jasa perbaikan, konstruksi, renovasi, arsitektur, interior, dan eksterior untuk rumah serta tempat usaha di Bandung." />
  <link rel="canonical" href="/" />
</svelte:head>

<PublicShell>
  <main id="content">
    <section class="page-shell grid min-h-[42rem] items-end gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
      <div><p class="eyebrow mb-6 text-clay">{hero.eyebrow || 'Jasa Perbaikan, Arsitektur, Interior, dan Renovasi'}</p><h1 class="max-w-4xl font-display text-5xl font-bold leading-[0.96] tracking-[-0.045em] text-balance sm:text-7xl lg:text-8xl">{hero.heading || 'Perbaikan & renovasi di Bandung.'}</h1><p class="mt-8 max-w-2xl text-lg leading-8 text-forest">{hero.body || 'HD Karya Bandung adalah mitra profesional untuk jasa konstruksi, renovasi, pekerjaan arsitektur, serta penataan interior dan eksterior di Kota Bandung dan sekitarnya.'}</p><div class="mt-10 flex flex-wrap gap-3"><a class="button-primary" href={hero.cta_href || '/kontak'}>{hero.cta_label || 'Konsultasi gratis'} <span aria-hidden="true">↗</span></a><a class="button-secondary" href="/layanan">Lihat layanan</a></div></div>
      <img class="h-80 w-full object-cover sm:h-[30rem]" src="/assets/hero-construction.png" alt="Rumah kontemporer yang sedang dibangun di perbukitan Bandung" />
    </section>
    <section class="border-y border-stone bg-mist"><div class="page-shell grid gap-8 py-14 md:grid-cols-3"><p class="text-lg font-bold">Apa yang kami kerjakan</p><p class="md:col-span-2 text-2xl leading-tight text-forest">Konstruksi dan renovasi umum, utilitas dan sistem keamanan, material struktural, interior serta restorasi kayu, hingga identitas visual bisnis.</p></div></section>
    <section class="page-shell py-20 lg:py-28"><div class="mb-12 grid gap-6 lg:grid-cols-[0.65fr_1.35fr]"><p class="eyebrow text-clay">Layanan kami</p><div><h2 class="section-title">Dari perbaikan kecil sampai pengerjaan yang lebih menyeluruh.</h2><p class="mt-5 max-w-2xl leading-7 text-forest">Didukung tenaga ahli berpengalaman, pengerjaan rapi, dan komitmen pada ketepatan waktu dengan biaya yang transparan.</p></div></div><ContentGrid items={data.services} emptyTitle="Layanan sedang disiapkan" emptyBody="Ceritakan kebutuhan Anda agar kami dapat mengarahkan layanan yang relevan." /></section>
    <section class="bg-ink text-white"><div class="page-shell grid gap-10 py-20 lg:grid-cols-[0.7fr_1.3fr]"><div><p class="eyebrow text-clay">Proses kerja</p><h2 class="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-balance sm:text-5xl">Keputusan yang jelas sebelum pekerjaan dimulai.</h2></div><ol class="divide-y divide-white/20 border-t border-white/20"><li class="grid grid-cols-[3rem_1fr] gap-4 py-5"><span class="font-bold text-clay">01</span><div><h3 class="font-bold">Konsultasi & konteks</h3><p class="mt-2 text-white/70">Kebutuhan, lokasi, batasan, dan target dibahas lebih dulu.</p></div></li><li class="grid grid-cols-[3rem_1fr] gap-4 py-5"><span class="font-bold text-clay">02</span><div><h3 class="font-bold">Survey & arah kerja</h3><p class="mt-2 text-white/70">Ruang, tahapan, serta titik keputusan dipetakan secara realistis.</p></div></li><li class="grid grid-cols-[3rem_1fr] gap-4 py-5"><span class="font-bold text-clay">03</span><div><h3 class="font-bold">Pengerjaan & pembaruan</h3><p class="mt-2 text-white/70">Eksekusi dijalankan dengan komunikasi berkala hingga serah terima.</p></div></li></ol></div></section>
    <section class="page-shell py-20 lg:py-28"><div class="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p class="eyebrow text-clay">Dokumentasi proyek</p><h2 class="section-title mt-5">Konteks yang bisa ditelusuri, bukan sekadar galeri.</h2></div><a class="text-link" href="/proyek">Lihat semua proyek ↗</a></div><ContentGrid items={data.projects} emptyTitle="Studi kasus sedang disiapkan" emptyBody="Kami hanya menerbitkan proyek dengan konteks dan informasi yang dapat dipertanggungjawabkan." /></section>
    <section class="bg-spruce text-white"><div class="page-shell grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end"><div><p class="eyebrow text-white/70">Mulai dari percakapan awal</p><h2 class="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-5xl">Ceritakan ruang yang ingin Anda siapkan.</h2></div><a class="button-primary bg-white text-ink hover:bg-mist" href="/kontak">Konsultasikan proyek</a></div></section>
  </main>
</PublicShell>
