<script lang="ts">
  import { parseData } from '$lib/content.js';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Sertifikasi | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Dokumen dan sertifikasi Jasa Perbaikan Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Sertifikasi" title="Dokumen pendukung yang dapat diperiksa." description="Informasi sertifikasi kami tampilkan bersama penerbit dan masa berlakunya bila tersedia." />
    <section class="page-shell py-16 sm:py-20 lg:py-24">
      {#if data.items.length}
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {#each data.items as item}
            {@const detail = parseData(item.data) as Record<string, string>}
            <article class="border border-stone bg-white p-6 shadow-[6px_6px_0_var(--color-mist)]">
              {#if detail.image_media_id}<img class="mb-5 aspect-[4/3] w-full object-cover" src={`/media/${detail.image_media_id}`} alt={item.media_alt || item.title} />{/if}
              <h2 class="font-display text-2xl font-bold text-ink">{item.title}</h2>
              {#if detail.issuer}<p class="mt-3 text-slate">Penerbit: {detail.issuer}</p>{/if}
              {#if detail.certificate_number}<p class="mt-1 text-sm text-slate">No. {detail.certificate_number}</p>{/if}
              {#if detail.issue_year || detail.expiration_date}<p class="mt-1 text-sm text-slate">{detail.issue_year ? `Terbit ${detail.issue_year}` : ''}{detail.issue_year && detail.expiration_date ? ' · ' : ''}{detail.expiration_date ? `Berlaku hingga ${detail.expiration_date}` : ''}</p>{/if}
              {#if detail.pdf_media_id}<a class="mt-5 inline-flex border-b-2 border-clay pb-1 text-sm font-bold text-ink hover:text-clay" href={`/media/${detail.pdf_media_id}`} target="_blank" rel="noreferrer">Lihat dokumen ↗</a>{/if}
            </article>
          {/each}
        </div>
      {:else}
        <div class="border border-stone bg-mist p-8 text-slate"><h2 class="font-display text-2xl font-bold text-ink">Sertifikasi sedang disiapkan</h2><p class="mt-3">Dokumen pendukung akan tampil setelah diverifikasi untuk publikasi.</p></div>
      {/if}
    </section>
  </main>
</PublicShell>
