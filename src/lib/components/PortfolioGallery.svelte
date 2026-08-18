<script lang="ts">
  import { parseData } from '$lib/content.js';
  import type { PortfolioMediaItem } from '$lib/server/cms';

  let { items, onselect }: { items: PortfolioMediaItem[]; onselect?: (index: number) => void } = $props();
</script>

<div class="columns-1 gap-4 min-[400px]:columns-2 md:columns-3 lg:columns-4">
  {#each items as item, index (item.id)}
    {@const data = parseData(item.data) as Record<string, string>}
    {@const mediaId = data.cover_media_id || data.media_id}
    <article class="mb-4 break-inside-avoid border border-stone bg-white">
      {#if mediaId}
        <button class="group block w-full cursor-zoom-in overflow-hidden bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay" type="button" aria-label={`Perbesar foto ${item.title}`} onclick={() => onselect?.(index)}>
          <img class="h-auto w-full transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]" src={`/media/${mediaId}`} alt={item.media_alt || item.title} width={item.media_width || 1200} height={item.media_height || 900} loading="lazy" decoding="async" />
        </button>
      {/if}
      <div class="border-t border-stone p-3">
        <h2 class="font-display text-sm font-bold leading-5 text-ink sm:text-base">{item.title}</h2>
        <a class="mt-2 inline-block text-xs font-bold text-clay underline underline-offset-4" href={`/portofolio/${item.slug}`}>Lihat keterangannya</a>
      </div>
    </article>
  {/each}
</div>
