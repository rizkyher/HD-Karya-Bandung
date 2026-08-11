<script lang="ts">
  import { parseData } from '$lib/content.js';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Klien &amp; Partner | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Klien dan partner Jasa Perbaikan Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Klien &amp; partner" title="Kolaborasi untuk pekerjaan yang lebih tertata." description="Kami menghargai setiap pihak yang mempercayakan kebutuhan perbaikan dan renovasinya kepada kami." />
    <section class="page-shell py-16 sm:py-20 lg:py-24">
      {#if data.items.length}
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {#each data.items as item}
            {@const detail = parseData(item.data) as Record<string, string>}
            <article class="grid min-h-48 place-items-center border border-stone bg-white p-7 text-center shadow-[6px_6px_0_var(--color-mist)]">
              {#if detail.logo_media_id}
                <img class="max-h-24 max-w-full object-contain" src={`/media/${detail.logo_media_id}`} alt={item.media_alt || detail.logo_alt || item.title} />
              {:else}
                <h2 class="font-display text-2xl font-bold text-ink">{item.title}</h2>
              {/if}
              <p class="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-clay">{detail.partner_type || 'Partner'}</p>
            </article>
          {/each}
        </div>
      {:else}
        <div class="border border-stone bg-mist p-8 text-slate"><h2 class="font-display text-2xl font-bold text-ink">Daftar mitra sedang disiapkan</h2><p class="mt-3">Identitas klien dan partner akan ditampilkan sesuai izin publikasi.</p></div>
      {/if}
    </section>
  </main>
</PublicShell>
