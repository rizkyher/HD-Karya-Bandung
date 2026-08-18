<script lang="ts">
  import { parseData } from '$lib/content.js';
  import type { ContentItem } from '$lib/server/cms';

  let { category }: { category: { slug: string; name: string; description: string; cover: ContentItem; itemCount: number } } = $props();
  const coverData = $derived(parseData(category.cover.data) as Record<string, string>);
</script>

<a class="group block border border-stone bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay" href={`/portofolio/${category.slug}`}>
  <div class="relative aspect-[4/3] overflow-hidden bg-mist">
    {#if coverData.cover_media_id}
      <img class="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.025]" src={`/media/${coverData.cover_media_id}`} alt={category.cover.media_alt || category.cover.title} width="1448" height="1086" loading="lazy" decoding="async" />
    {/if}
    <span class="absolute bottom-0 left-0 bg-ink px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">{category.itemCount} dokumentasi</span>
  </div>
  <div class="grid grid-cols-[1fr_auto] items-end gap-5 border-t border-stone p-5 sm:p-6">
    <div>
      <h2 class="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">{category.name}</h2>
      <p class="mt-2 line-clamp-2 text-sm leading-6 text-forest">{category.description}</p>
    </div>
    <span class="grid min-h-11 min-w-11 place-items-center border border-ink bg-ink text-white transition-colors group-hover:border-clay group-hover:bg-clay" aria-hidden="true">↗</span>
  </div>
</a>
