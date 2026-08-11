<script lang="ts">
  import { parseData } from '$lib/content.js';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Testimoni | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Cerita pengalaman pelanggan Jasa Perbaikan Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Testimoni" title="Pengalaman yang dibagikan setelah pekerjaan selesai." description="Cerita pelanggan membantu Anda memahami cara kami mendampingi setiap pekerjaan." />
    <section class="page-shell py-16 sm:py-20 lg:py-24">
      {#if data.items.length}
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {#each data.items as item}
            {@const detail = parseData(item.data) as Record<string, string>}
            <figure class="border border-stone bg-white p-7 shadow-[6px_6px_0_var(--color-mist)]">
              <blockquote class="font-display text-xl font-bold leading-8 text-ink">“{detail.quote || item.body || item.summary}”</blockquote>
              <figcaption class="mt-6 border-t border-stone pt-4 text-sm text-slate"><strong class="block text-ink">{item.title}</strong>{detail.position || detail.company ? `${detail.position}${detail.position && detail.company ? ' · ' : ''}${detail.company}` : ''}</figcaption>
            </figure>
          {/each}
        </div>
      {:else}
        <div class="border border-stone bg-mist p-8 text-slate"><h2 class="font-display text-2xl font-bold text-ink">Testimoni sedang disiapkan</h2><p class="mt-3">Cerita pelanggan akan ditampilkan setelah mendapat persetujuan untuk dipublikasikan.</p></div>
      {/if}
    </section>
  </main>
</PublicShell>
