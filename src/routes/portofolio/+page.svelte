<script lang="ts">
  import ContentGrid from '$lib/components/ContentGrid.svelte';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';
  import { parseData } from '$lib/content.js';

  let { data }: { data: import('./$types').PageData } = $props();

  const portfolioUrl = (page = 1, category = data.activeCategory) => {
    const params = new URLSearchParams();
    if (category) params.set('kategori', category);
    if (page > 1) params.set('halaman', String(page));
    const query = params.toString();
    return query ? `/portofolio?${query}` : '/portofolio';
  };
</script>

<svelte:head>
  <title>Portofolio Kami | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Dokumentasi pekerjaan renovasi, furniture kayu, instalasi listrik, dan kusen aluminium di Bandung." />
  <link rel="canonical" href="https://jasaperbaikanbandung.com/portofolio" />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Portofolio Kami" title="Dokumentasi pekerjaan nyata dari empat kelompok layanan." description="Telusuri proses dan hasil pekerjaan berdasarkan kebutuhan ruang Anda." />

    {#if data.covers.length}
      <section class="page-shell py-10 sm:py-14 lg:py-16" aria-labelledby="portfolio-categories">
        <p class="eyebrow text-clay">Kelompok pekerjaan</p>
        <h2 id="portfolio-categories" class="mt-4 font-display text-4xl font-bold tracking-[-0.035em] text-balance">Pilih portofolio yang paling relevan.</h2>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {#each data.covers as item}
            {@const itemData = parseData(item.data) as Record<string, string>}
            <a class="group grid min-h-72 grid-rows-[1fr_auto] border border-stone bg-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay" href={portfolioUrl(1, item.category)}>
              <div class="flex min-h-52 items-center justify-center overflow-hidden bg-mist p-3">
                {#if itemData.cover_media_id}
                  <img class="h-full max-h-64 w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]" src={`/media/${itemData.cover_media_id}`} alt={item.media_alt || item.title} width="1448" height="1086" loading="lazy" />
                {:else}
                  <span class="px-5 text-center text-sm font-bold text-forest">Foto sampul sedang disiapkan</span>
                {/if}
              </div>
              <div class="border-t border-stone p-5">
                <p class="eyebrow text-clay">{item.category}</p>
                <h3 class="mt-3 font-display text-2xl font-bold tracking-[-0.025em]">{item.title}</h3>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    <section class="page-shell py-10 sm:py-14 lg:py-16">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="eyebrow text-clay">Filter portofolio</p>
          <p class="mt-2 text-sm leading-6 text-forest">Pilih kategori untuk menemukan dokumentasi yang paling relevan.</p>
        </div>
        {#if data.activeCategory}<a class="text-link text-sm" href={portfolioUrl(1, '')}>Reset filter</a>{/if}
      </div>
      <nav class="-mx-5 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" aria-label="Filter portofolio">
        {#each ['', ...data.categories] as category}
          <a class={`flex min-h-11 shrink-0 snap-start items-center border px-4 text-sm font-bold transition-colors ${data.activeCategory === category ? 'border-ink bg-ink text-white' : 'border-stone text-forest hover:border-ink hover:text-ink'}`} href={portfolioUrl(1, category)} aria-current={data.activeCategory === category ? 'page' : undefined}>{category || 'Semua portofolio'}</a>
        {/each}
      </nav>

      <p class="mb-7 mt-8 text-sm font-bold text-forest" aria-live="polite">Menampilkan {data.items.length} portofolio{data.activeCategory ? ` untuk ${data.activeCategory}` : ''}.</p>
      <ContentGrid items={data.items} emptyTitle="Portofolio sedang disiapkan" emptyBody="Dokumentasi pada kategori ini belum tersedia." />

      {#if data.pageCount > 1}
        <nav class="mt-10 border-t border-stone pt-6" aria-label="Paginasi portofolio">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-center text-sm font-bold text-forest sm:text-left">Halaman {data.page} dari {data.pageCount}</p>
            <div class="grid grid-cols-2 gap-3 sm:flex">
              {#if data.page > 1}<a class="button-secondary justify-center" href={portfolioUrl(data.page - 1)}>← Sebelumnya</a>{:else}<span class="min-h-11 border border-stone px-4 py-2.5 text-center text-sm font-bold text-forest/50" aria-disabled="true">← Sebelumnya</span>{/if}
              {#if data.page < data.pageCount}<a class="button-primary justify-center" href={portfolioUrl(data.page + 1)}>Berikutnya →</a>{:else}<span class="min-h-11 bg-ink/20 px-4 py-2.5 text-center text-sm font-bold text-ink/50" aria-disabled="true">Berikutnya →</span>{/if}
            </div>
          </div>
        </nav>
      {/if}
    </section>
  </main>
</PublicShell>
