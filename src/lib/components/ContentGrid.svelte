<script lang="ts">
  import type { ContentItem } from '$lib/server/cms';
  import { parseData, routeForKind } from '$lib/content.js';

  const illustrations: Record<ContentItem['kind'], { src: string; alt: string }> = {
    LAYANAN: { src: '/assets/dummy-renovation.webp', alt: 'Proses renovasi hunian kontemporer' },
    PROYEK: { src: '/assets/dummy-house.webp', alt: 'Eksterior hunian kontemporer' },
    ARTIKEL: { src: '/assets/dummy-materials.webp', alt: 'Material bangunan dan interior' },
    GALERI: { src: '/assets/dummy-interior.webp', alt: 'Interior hunian kontemporer' },
    TESTIMONI: { src: '/assets/dummy-interior.webp', alt: 'Interior hunian kontemporer' },
    KLIEN: { src: '/assets/dummy-house.webp', alt: 'Eksterior hunian kontemporer' },
    SERTIFIKASI: { src: '/assets/dummy-materials.webp', alt: 'Material bangunan dan interior' }
  };

  let { items, emptyTitle, emptyBody }: { items: ContentItem[]; emptyTitle: string; emptyBody: string } = $props();
</script>

{#if items.length}
  <div class="grid gap-x-8 border-t border-stone md:grid-cols-2 lg:grid-cols-3">
    {#each items as item}
      {@const data = parseData(item.data) as Record<string, string>}
      {@const illustration = illustrations[item.kind]}
      {@const mediaId = data.cover_media_id || data.media_id}
      <article class="group flex min-h-72 flex-col border-b border-stone py-6 transition-colors duration-300 hover:bg-mist/60 sm:pr-7">
        <a class="relative block aspect-[4/3] overflow-hidden bg-mist p-2 focus-visible:outline-offset-2" href={`/${routeForKind(item.kind)}/${item.slug}`} aria-label={`Lihat ${item.title}`}>
          {#if mediaId}
            <img class="h-full w-full object-contain" src={`/media/${mediaId}`} alt={item.media_alt || data.alt || item.title} width="1448" height="1086" loading="lazy" />
          {:else}
            <img class="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.035] group-active:scale-[1.02]" src={illustration.src} alt={`${illustration.alt} — foto ilustrasi sementara, bukan dokumentasi pekerjaan Jasa Perbaikan Bandung`} width="1448" height="1086" loading="lazy" />
            <p class="absolute bottom-0 left-0 bg-ink px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">Foto ilustrasi sementara</p>
          {/if}
        </a>
        <p class="eyebrow mt-5 text-clay">{item.kind === 'ARTIKEL' ? `${data.author || 'Jasa Perbaikan Bandung'} · ${Math.max(1, Math.ceil(item.body.split(/\s+/).filter(Boolean).length / 200))} menit` : item.category || data.location || 'Jasa Perbaikan Bandung'}</p>
        <h2 class="mt-3 font-display text-2xl font-bold leading-[1.05] tracking-[-0.03em] text-balance sm:text-3xl"><a class="hover:text-clay" href={`/${routeForKind(item.kind)}/${item.slug}`}>{item.title}</a></h2>
        <p class="mt-3 line-clamp-2 max-w-sm leading-7 text-forest">{item.summary}</p>
        {#if item.kind !== 'GALERI'}
          <a class="text-link mt-auto pt-7" href={`/${routeForKind(item.kind)}/${item.slug}`}>{item.kind === 'ARTIKEL' ? 'Baca artikel' : 'Lihat detail'} <span aria-hidden="true">↗</span></a>
        {:else}
          <p class="mt-auto pt-7 text-sm font-bold text-forest">Dokumentasi pekerjaan</p>
        {/if}
      </article>
    {/each}
  </div>
{:else}
  <section class="grid overflow-hidden border border-stone bg-mist md:grid-cols-[0.85fr_1.15fr]">
    <img class="h-full min-h-64 w-full object-cover" src="/assets/dummy-renovation.webp" alt="Proses renovasi hunian kontemporer — foto ilustrasi sementara, bukan dokumentasi pekerjaan Jasa Perbaikan Bandung" width="1448" height="1086" loading="lazy" />
    <div class="p-8 sm:p-12"><p class="eyebrow text-clay">Sedang disiapkan</p><h2 class="mt-4 font-display text-4xl font-bold tracking-[-0.035em] text-balance">{emptyTitle}</h2><p class="mt-4 max-w-2xl leading-7 text-forest">{emptyBody}</p><p class="mt-5 text-sm leading-6 text-forest">Foto ilustrasi sementara — bukan dokumentasi pekerjaan Jasa Perbaikan Bandung.</p><a class="button-primary mt-7" href="/kontak">Konsultasikan kebutuhan Anda</a></div>
  </section>
{/if}
