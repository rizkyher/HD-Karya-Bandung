<script lang="ts">
  import ContentDetail from '$lib/components/ContentDetail.svelte';
  import PortfolioGallery from '$lib/components/PortfolioGallery.svelte';
  import PortfolioLightbox from '$lib/components/PortfolioLightbox.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
  let lightboxOpen = $state(false);
  let lightboxIndex = $state(0);

  function openAt(index: number) {
    lightboxIndex = index;
    lightboxOpen = true;
  }
</script>

<svelte:head>
  {#if data.mode === 'category'}
    <title>{data.category.name} | Portofolio Kami</title>
    <meta name="description" content={`Lihat ${data.total} dokumentasi pekerjaan ${data.category.name} oleh Jasa Perbaikan Bandung.`} />
    <link rel="canonical" href={`/portofolio/${data.category.slug}`} />
  {/if}
</svelte:head>

{#if data.mode === 'item'}
  <ContentDetail item={data.item} />
{:else}
  <PublicShell>
    <main id="content">
      <section class="border-b border-stone">
        <div class="page-shell py-9 sm:py-12 lg:py-16">
          <a class="inline-flex min-h-11 items-center text-sm font-bold text-forest underline underline-offset-4 hover:text-clay" href="/portofolio">← Portofolio Kami</a>
          <header class="mt-6 max-w-3xl">
            <p class="eyebrow text-clay">Galeri pekerjaan</p>
            <h1 class="mt-3 font-display text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-balance">{data.category.name}</h1>
            <p class="mt-5 max-w-2xl leading-7 text-forest">{data.category.description}</p>
            <p class="mt-4 text-sm font-bold text-ink">{data.total} dokumentasi · halaman {data.page} dari {data.pageCount}</p>
          </header>

          <nav class="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" aria-label="Pilih bidang portofolio">
            {#each data.categories as category}
              <a class={`flex min-h-11 items-center justify-center border px-3 text-center text-xs font-bold transition-colors sm:text-sm ${category.slug === data.category.slug ? 'border-ink bg-ink text-white' : 'border-stone text-forest hover:border-ink hover:text-ink'}`} href={`/portofolio/${category.slug}`} aria-current={category.slug === data.category.slug ? 'page' : undefined}>{category.name}</a>
            {/each}
          </nav>
        </div>
      </section>

      <section class="page-shell py-8 sm:py-12 lg:py-16" aria-label={`Dokumentasi ${data.category.name}`}>
        {#if data.items.length}
          <PortfolioGallery items={data.items} onselect={openAt} />
        {:else}
          <div class="border border-dashed border-stone p-10 text-center text-forest">Belum ada dokumentasi untuk bidang ini.</div>
        {/if}

        {#if data.pageCount > 1}
          <nav class="mt-10 border-t border-stone pt-6" aria-label="Paginasi portofolio">
            <p class="text-center text-sm font-bold text-forest">Halaman {data.page} dari {data.pageCount}</p>
            <div class="mt-4 flex justify-center gap-2">
              {#each Array.from({ length: data.pageCount }, (_, index) => index + 1) as pageNumber}
                <a class={`grid min-h-11 min-w-11 place-items-center border text-sm font-bold ${data.page === pageNumber ? 'border-ink bg-ink text-white' : 'border-stone text-forest hover:border-ink'}`} href={`/portofolio/${data.category.slug}${pageNumber > 1 ? `?halaman=${pageNumber}` : ''}`} aria-label={`Halaman ${pageNumber}`} aria-current={data.page === pageNumber ? 'page' : undefined}>{pageNumber}</a>
              {/each}
            </div>
            <div class="mx-auto mt-4 grid max-w-md grid-cols-2 gap-3">
              {#if data.page > 1}<a class="button-secondary justify-center" href={`/portofolio/${data.category.slug}${data.page > 2 ? `?halaman=${data.page - 1}` : ''}`}>← Sebelumnya</a>{:else}<span class="min-h-11 border border-stone px-4 py-2.5 text-center text-sm font-bold text-forest/50" aria-disabled="true">← Sebelumnya</span>{/if}
              {#if data.page < data.pageCount}<a class="button-primary justify-center" href={`/portofolio/${data.category.slug}?halaman=${data.page + 1}`}>Berikutnya →</a>{:else}<span class="min-h-11 bg-ink/20 px-4 py-2.5 text-center text-sm font-bold text-ink/50" aria-disabled="true">Berikutnya →</span>{/if}
            </div>
          </nav>
        {/if}
      </section>
    </main>
  </PublicShell>

  <PortfolioLightbox items={data.items} bind:index={lightboxIndex} bind:open={lightboxOpen} />
{/if}
