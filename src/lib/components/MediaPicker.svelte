<script lang="ts">
  type Media = { id: string; original_filename: string; content_type: string; alt: string | null };

  let { name, label, value = '', media, type = 'image' }: { name: string; label: string; value?: string; media: Media[]; type?: 'image' | 'pdf' } = $props();
  let selectedId = $state('');
  let options = $derived(media.filter((item) => type === 'pdf' ? item.content_type === 'application/pdf' : item.content_type.startsWith('image/')));
  let selected = $derived(media.find((item) => item.id === selectedId));

  $effect(() => { selectedId = value; });
</script>

<fieldset class="grid gap-3">
  <legend class="text-sm font-bold">{label}</legend>
  <p class="text-sm leading-6 text-forest">Pilih file yang sudah diunggah di Media. Jika belum ada, upload file terlebih dahulu.</p>
  {#if selected?.content_type.startsWith('image/')}
    <img class="aspect-[4/3] w-full max-w-xs border border-stone object-cover" src={`/media/${selected.id}`} alt={selected.alt || selected.original_filename} />
  {:else if selected}
    <p class="border border-stone bg-mist p-3 text-sm text-forest">File terpilih: <strong>{selected.original_filename}</strong></p>
  {/if}
  <label class="flex w-fit items-center gap-2 text-sm font-medium"><input type="radio" name={name} value="" bind:group={selectedId} /> Jangan tampilkan media</label>
  <details open={Boolean(selectedId)} class="border border-stone bg-mist">
    <summary class="cursor-pointer p-3 text-sm font-bold">Pilih dari {options.length} file tersedia</summary>
    <div class="grid gap-3 border-t border-stone p-3 sm:grid-cols-2 lg:grid-cols-3">
      {#each options as item}
        <label class={`cursor-pointer border p-2 transition hover:border-clay ${selectedId === item.id ? 'border-clay bg-white' : 'border-stone bg-cloud'}`}>
          <input class="sr-only" type="radio" name={name} value={item.id} bind:group={selectedId} />
          {#if item.content_type.startsWith('image/')}
            <img class="aspect-[4/3] w-full object-cover" src={`/media/${item.id}`} alt={item.alt || item.original_filename} loading="lazy" />
          {/if}
          <span class="mt-2 block break-all text-xs font-bold">{item.original_filename}</span>
          <span class="mt-1 block text-xs text-forest">{item.alt || 'Tanpa alt text'}</span>
        </label>
      {:else}
        <p class="text-sm text-forest">Belum ada file yang sesuai. Upload dari menu Media terlebih dahulu.</p>
      {/each}
    </div>
  </details>
</fieldset>
