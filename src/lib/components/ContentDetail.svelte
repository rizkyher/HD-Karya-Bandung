<script lang="ts">
  import PublicShell from './PublicShell.svelte';
  import type { ContentItem } from '$lib/server/cms';
  import { contentLabels, parseData, routeForKind } from '$lib/content.js';

  let { item }: { item: ContentItem } = $props();
  let data = $derived(parseData(item.data) as Record<string, string>);
  let paragraphs = $derived(String(item.body || '').split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean));
  let kindRoute = $derived(routeForKind(item.kind));
  let mediaId = $derived(data.cover_media_id || data.media_id);
  let facts = $derived(item.kind === 'PROYEK' ? [['Lokasi', data.location], ['Sektor', data.sector], ['Status', data.project_status], ['Tahun', [data.start_year, data.end_year].filter(Boolean).join('–')]].filter((entry) => entry[1]) : []);
  let extra = $derived(item.kind === 'LAYANAN' ? [['Cocok untuk', data.suitable_for], ['Masalah yang ditangani', data.problems], ['Scope pekerjaan', data.scope], ['Deliverables', data.deliverables], ['Proses kerja', data.process]] : item.kind === 'PROYEK' ? [['Tantangan pekerjaan', data.challenge], ['Solusi', data.solution], ['Scope pekerjaan', data.scope], ['Hasil', data.result]] : []);
  let faq = $derived(String(data.faq || '').split('\n').map((row) => row.split('|').map((part) => part.trim())).filter(([question, answer]) => question && answer));
</script>

<svelte:head>
  <title>{item.seo_title || `${item.title} | Jasa Perbaikan Bandung`}</title>
  <meta name="description" content={item.meta_description || item.summary} />
  <link rel="canonical" href={item.canonical_url || `/${kindRoute}/${item.slug}`} />
  {#if item.index_status !== 'INDEX_FOLLOW'}<meta name="robots" content="noindex,follow" />{/if}
</svelte:head>

<PublicShell>
  <main id="content">
    <article class="page-shell py-12 sm:py-16 lg:py-20">
      <nav class="mb-10 flex flex-wrap gap-2 border-b border-stone pb-5 text-sm text-forest" aria-label="Breadcrumb">
        <a class="hover:text-clay" href="/">Beranda</a><span>/</span><a class="hover:text-clay" href={`/${kindRoute}`}>{(contentLabels as Record<string, string>)[item.kind]}</a><span>/</span><span aria-current="page">{item.title}</span>
      </nav>

      <header class="max-w-5xl">
        <p class="eyebrow text-clay">{item.category || (item.kind === 'ARTIKEL' ? data.author || 'Jasa Perbaikan Bandung' : 'Jasa Perbaikan Bandung')}</p>
        <h1 class={`${item.kind === 'PROYEK' ? 'max-w-4xl font-display text-[clamp(2.4rem,10vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-balance' : 'page-title'} mt-5`}>{item.title}</h1>
        <p class="mt-7 max-w-3xl text-xl leading-8 text-forest">{item.summary}</p>
        {#if item.kind === 'ARTIKEL'}<p class="mt-5 text-sm font-bold text-forest">{data.author || 'Jasa Perbaikan Bandung'} · Estimasi {Math.max(1, Math.ceil(item.body.split(/\s+/).filter(Boolean).length / 200))} menit baca</p>{/if}
      </header>

      {#if mediaId}
        <figure class="mt-10 overflow-hidden border border-stone bg-mist p-3 sm:mt-12 sm:p-5">
          <img class="mx-auto max-h-[72dvh] w-full object-contain" src={`/media/${mediaId}`} alt={item.media_alt || data.alt || item.title} width="1600" height="900" />
          <figcaption class="mt-3 flex items-center justify-between gap-4 border-t border-stone pt-3 text-sm text-forest"><span>{item.media_alt || data.alt || item.title}</span><a class="shrink-0 font-bold text-ink underline underline-offset-4 hover:text-clay" href={`/media/${mediaId}`} target="_blank" rel="noreferrer">Buka foto penuh ↗</a></figcaption>
        </figure>
      {/if}

      {#if facts.length}
        <dl class="mt-12 grid gap-px border-y border-stone bg-stone sm:grid-cols-2 lg:grid-cols-4">
          {#each facts as fact}<div class="bg-cloud p-5"><dt class="eyebrow text-forest">{fact[0]}</dt><dd class="mt-3 font-bold">{fact[1]}</dd></div>{/each}
        </dl>
      {/if}

      <div class="mt-14 max-w-3xl space-y-7 text-[1.05rem] leading-8 text-forest">
        {#each paragraphs as paragraph}<p>{paragraph}</p>{/each}
      </div>

      {#each extra as section}
        {#if section[1]}
          <section class="mt-14 max-w-3xl border-t border-stone pt-8"><h2 class="font-display text-3xl font-bold tracking-[-0.03em]">{section[0]}</h2><ul class="mt-5 grid gap-3 leading-7 text-forest">{#each String(section[1]).split('\n').filter(Boolean) as entry}<li class="grid grid-cols-[0.75rem_1fr] gap-3"><span class="mt-2.5 h-1.5 w-1.5 bg-clay"></span>{entry}</li>{/each}</ul></section>
        {/if}
      {/each}

      {#if faq.length}
        <section class="mt-14 max-w-3xl border-t border-stone pt-8"><h2 class="font-display text-3xl font-bold tracking-[-0.03em]">Pertanyaan umum</h2><div class="mt-5 divide-y divide-stone border-y border-stone">{#each faq as entry}<details class="group py-5"><summary class="cursor-pointer font-bold marker:text-clay">{entry[0]}</summary><p class="pt-4 leading-7 text-forest">{entry[1]}</p></details>{/each}</div></section>
      {/if}

      <aside class="mt-16 max-w-4xl bg-ink p-8 text-white sm:p-10"><p class="eyebrow text-clay">Diskusikan kebutuhan Anda</p><h2 class="mt-4 font-display text-3xl font-bold tracking-[-0.03em]">Butuh arah untuk pekerjaan serupa?</h2><p class="mt-4 max-w-2xl leading-7 text-white/70">Ceritakan lokasi, kebutuhan, dan target waktunya agar percakapan pertama lebih terarah.</p><a class="button-primary mt-7 bg-white text-ink hover:bg-mist" href="/kontak">Mulai konsultasi</a></aside>
    </article>
  </main>
</PublicShell>
