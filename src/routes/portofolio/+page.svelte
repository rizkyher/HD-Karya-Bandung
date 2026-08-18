<script lang="ts">
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PortfolioCategoryCard from '$lib/components/PortfolioCategoryCard.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Portofolio Kami | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Dokumentasi pekerjaan renovasi, furniture kayu, instalasi listrik, dan kusen aluminium di Bandung." />
  <link rel="canonical" href="https://jasaperbaikanbandung.com/portofolio" />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro compact label="Portofolio Kami" title="Dokumentasi nyata dari pekerjaan kami." description="Telusuri hasil pekerjaan berdasarkan layanan. Setiap foto ditampilkan mengikuti rasio aslinya agar detailnya tetap terlihat." />

    <section class="page-shell py-10 sm:py-14 lg:py-20" aria-labelledby="portfolio-categories">
      <div class="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
        <div>
          <p class="eyebrow text-clay">Empat bidang pekerjaan</p>
          <h2 id="portfolio-categories" class="mt-3 font-display text-3xl font-bold tracking-[-0.035em] text-balance sm:text-4xl">Pilih bidang pekerjaan.</h2>
        </div>
        <p class="max-w-sm text-sm leading-6 text-forest">Buka salah satu galeri untuk melihat seluruh dokumentasi dan memperbesar setiap foto.</p>
      </div>

      {#if data.categories.length}
        <div class="grid gap-5 sm:grid-cols-2">
          {#each data.categories as category (category.slug)}
            <PortfolioCategoryCard {category} />
          {/each}
        </div>
      {:else}
        <div class="border border-dashed border-stone p-10 text-center text-forest">Dokumentasi portofolio sedang disiapkan.</div>
      {/if}
    </section>
  </main>
</PublicShell>
