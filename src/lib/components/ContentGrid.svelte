<script lang="ts">
  import type { ContentItem } from '$lib/server/cms';
  import { parseData, routeForKind } from '$lib/content.js';
  let { items, emptyTitle, emptyBody }: { items: ContentItem[]; emptyTitle: string; emptyBody: string } = $props();
</script>

{#if items.length}
  <div class="grid gap-x-8 border-t border-ink md:grid-cols-2 lg:grid-cols-3">
    {#each items as item}
      {@const data = parseData(item.data) as Record<string, string>}
      <article class="flex min-h-72 flex-col border-b border-ink py-6 pr-4 sm:pr-7">
        <p class="eyebrow text-clay">{item.kind === 'ARTIKEL' ? `${data.author || 'HD Karya Bandung'} · ${Math.max(1, Math.ceil(item.body.split(/\s+/).filter(Boolean).length / 200))} menit` : item.category || data.location || 'HD Karya Bandung'}</p>
        <h2 class="mt-6 font-display text-3xl font-bold leading-[1.03] tracking-[-0.035em] text-balance">{item.title}</h2>
        <p class="mt-4 max-w-sm leading-7 text-forest">{item.summary}</p>
        <a class="text-link mt-auto pt-7" href={`/${routeForKind(item.kind)}/${item.slug}`}>{item.kind === 'ARTIKEL' ? 'Baca artikel' : 'Lihat detail'} <span aria-hidden="true">↗</span></a>
      </article>
    {/each}
  </div>
{:else}
  <section class="border border-stone bg-mist p-8 sm:p-12"><p class="eyebrow text-clay">Sedang disiapkan</p><h2 class="mt-4 font-display text-4xl font-bold tracking-[-0.04em]">{emptyTitle}</h2><p class="mt-4 max-w-2xl leading-7 text-forest">{emptyBody}</p><a class="button-primary mt-7" href="/kontak">Konsultasikan kebutuhan Anda</a></section>
{/if}
