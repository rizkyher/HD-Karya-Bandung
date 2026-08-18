<script lang="ts">
  import ContentGrid from '$lib/components/ContentGrid.svelte';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();

  const galleryUrl = (page = 1, category = data.activeCategory) => {
    const params = new URLSearchParams();
    if (category) params.set('kategori', category);
    if (page > 1) params.set('halaman', String(page));
    const query = params.toString();
    return query ? `/galeri?${query}` : '/galeri';
  };
</script>

<svelte:head>
  <title>Galeri | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Galeri dokumentasi pekerjaan Jasa Perbaikan Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Galeri" title="Dokumentasi untuk melengkapi cerita proyek." description="Media yang ditampilkan melengkapi informasi proyek dan pekerjaan yang tersedia." />
    {#if data.categories.length}
      <section class="page-shell pt-10 sm:pt-14">
        <p class="eyebrow text-clay">Filter galeri</p>
        <nav class="mt-4 flex flex-wrap gap-2" aria-label="Filter galeri">
          {#each ['', ...data.categories] as category}
            <a class={`border px-4 py-2 text-sm font-bold transition-colors ${data.activeCategory === category ? 'border-ink bg-ink text-white' : 'border-stone text-forest hover:border-ink'}`} href={galleryUrl(1, category)} aria-current={data.activeCategory === category ? 'page' : undefined}>{category || 'Semua dokumentasi'}</a>
          {/each}
        </nav>
      </section>
    {/if}
    <section class="page-shell py-10 sm:py-14 lg:py-16">
      <p class="mb-7 text-sm font-bold text-forest" aria-live="polite">Menampilkan {data.items.length} dokumentasi{data.activeCategory ? ` untuk ${data.activeCategory}` : ''}.</p>
      <ContentGrid items={data.items} emptyTitle="Dokumentasi belum tersedia" emptyBody="Belum ada dokumentasi untuk filter yang dipilih." />
      {#if data.pageCount > 1}
        <nav class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-stone pt-6" aria-label="Pagination galeri">
          <p class="text-sm font-bold text-forest">Halaman {data.page} dari {data.pageCount}</p>
          <div class="flex gap-3">
            {#if data.page > 1}<a class="button-secondary" href={galleryUrl(data.page - 1)}>← Sebelumnya</a>{/if}
            {#if data.page < data.pageCount}<a class="button-primary" href={galleryUrl(data.page + 1)}>Berikutnya →</a>{/if}
          </div>
        </nav>
      {/if}
    </section>
  </main>
</PublicShell>
