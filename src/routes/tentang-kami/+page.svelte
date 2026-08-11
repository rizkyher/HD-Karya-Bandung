<script lang="ts">
  import PublicShell from '$lib/components/PublicShell.svelte';

  const strengths = [
    ['Konsultasi gratis', 'Diskusi fleksibel tanpa biaya untuk membantu menemukan solusi yang sesuai kebutuhan dan budget.'],
    ['Harga transparan', 'Penawaran kompetitif dan jelas tanpa mengorbankan kualitas material maupun hasil pengerjaan.'],
    ['Sesuai desain dan waktu', 'Pengerjaan terencana dan disiplin sesuai kesepakatan desain serta batas waktu yang ditentukan.'],
    ['Jaminan maintenance', 'Layanan purnajual untuk membantu menjaga kepuasan serta rasa tenang atas hasil kerja.']
  ];
</script>

<svelte:head>
  <title>Tentang Jasa Perbaikan Bandung</title>
  <meta name="description" content="Mitra profesional untuk perbaikan, renovasi, arsitektur, interior, dan eksterior di Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <section class="page-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:py-28">
      <div><p class="eyebrow text-clay">Tentang Jasa Perbaikan Bandung</p></div>
      <div><h1 class="page-title">Mitra profesional untuk ruang yang kokoh, presisi, dan estetis.</h1><p class="mt-8 max-w-3xl text-xl leading-8 text-forest">Jasa Perbaikan Bandung adalah mitra profesional untuk perbaikan, renovasi, pekerjaan arsitektur, serta penataan interior dan eksterior di Kota Bandung dan sekitarnya. Kami membantu merawat, memperbaiki, dan mempercantik hunian, kantor, maupun tempat usaha.</p></div>
    </section>

    <section class="border-y border-stone bg-mist"><div class="page-shell grid gap-8 py-14 md:grid-cols-[0.75fr_1.25fr] md:items-center"><p class="font-bold">Cara kerja kami</p><p class="max-w-4xl text-[clamp(1.45rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.02em] text-forest">Didukung tenaga ahli berpengalaman, pengerjaan rapi, dan komitmen pada ketepatan waktu—mulai dari perbaikan skala kecil hingga renovasi total dengan biaya yang bersahabat dan transparan.</p></div></section>

    <section class="page-shell py-16 sm:py-20 lg:py-24"><div class="grid gap-x-10 border-t border-stone sm:grid-cols-2">{#each strengths as strength}<article class="border-b border-stone py-8"><h2 class="font-display text-3xl font-bold tracking-[-0.03em]">{strength[0]}</h2><p class="mt-4 max-w-md leading-7 text-forest">{strength[1]}</p></article>{/each}</div><a class="button-primary mt-10" href="/kontak">Mulai konsultasi <span aria-hidden="true">↗</span></a></section>
  </main>
</PublicShell>
