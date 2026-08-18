<script lang="ts">
  import { tick } from 'svelte';
  import { parseData } from '$lib/content.js';
  import type { PortfolioMediaItem } from '$lib/server/cms';

  let { items, index = $bindable(0), open = $bindable(false) }: { items: PortfolioMediaItem[]; index: number; open: boolean } = $props();
  let dialog = $state<HTMLDivElement>();
  let closeButton = $state<HTMLButtonElement>();
  const current = $derived(items[index]);
  const currentData = $derived(current ? parseData(current.data) as Record<string, string> : {});
  const mediaId = $derived(currentData.cover_media_id || currentData.media_id);

  const close = () => (open = false);
  const previous = () => { if (index > 0) index -= 1; };
  const next = () => { if (index < items.length - 1) index += 1; };

  function onKeydown(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowLeft') previous();
    else if (event.key === 'ArrowRight') next();
    else if (event.key === 'Tab' && dialog) {
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }

  $effect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    tick().then(() => closeButton?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  });
</script>

<svelte:window onkeydown={onKeydown} />

{#if open && current && mediaId}
  <div bind:this={dialog} data-lenis-prevent class="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-ink/95 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Pratinjau foto" tabindex="-1">
    <button class="absolute inset-0 cursor-default" type="button" aria-label="Tutup pratinjau" onclick={close}></button>

    <button bind:this={closeButton} class="fixed right-3 top-3 z-20 grid min-h-11 min-w-11 place-items-center border border-white/50 bg-ink text-white hover:bg-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6" type="button" aria-label="Tutup pratinjau" onclick={close}>
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 fill-none stroke-current stroke-2"><path d="m6 6 12 12M18 6 6 18" /></svg>
    </button>

    {#if index > 0}
      <button class="fixed bottom-3 left-3 z-20 min-h-11 border border-white/50 bg-ink px-4 text-sm font-bold text-white hover:bg-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2" type="button" aria-label="Foto sebelumnya" onclick={previous}>← Sebelumnya</button>
    {/if}

    <figure class="relative z-10 flex max-h-[92dvh] max-w-[94vw] flex-col items-center gap-3 px-1 pb-14 pt-12 sm:px-16 sm:pb-0 sm:pt-0">
      <img class="max-h-[78dvh] max-w-full object-contain" src={`/media/${mediaId}`} alt={current.media_alt || current.title} width={current.media_width || undefined} height={current.media_height || undefined} />
      <figcaption class="text-center text-sm text-white/75">{current.title} · {index + 1} dari {items.length}</figcaption>
    </figure>

    {#if index < items.length - 1}
      <button class="fixed bottom-3 right-3 z-20 min-h-11 border border-white/50 bg-ink px-4 text-sm font-bold text-white hover:bg-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2" type="button" aria-label="Foto berikutnya" onclick={next}>Berikutnya →</button>
    {/if}
  </div>
{/if}
