<script lang="ts">
  import { page } from '$app/state';

  let { children }: { children: import('svelte').Snippet } = $props();
  const links = [
    ['/layanan', 'Layanan'],
    ['/proyek', 'Proyek'],
    ['/galeri', 'Galeri'],
    ['/artikel', 'Artikel'],
    ['/tentang-kami', 'Tentang']
  ];

  const isActive = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<a class="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-50 focus:bg-white focus:p-3 focus:text-ink" href="#content">Lewati ke konten utama</a>

<header class="sticky top-0 z-40 border-b border-stone bg-cloud/95 backdrop-blur">
  <div class="page-shell flex min-h-20 items-center justify-between gap-5">
    <a href="/" class="flex items-center gap-3 font-display text-lg font-extrabold tracking-[-0.04em]" aria-label="HD Karya Bandung, beranda">
      <span class="grid h-9 w-9 place-items-center bg-ink text-sm text-white">HD</span>
      <span>HD Karya<br />Bandung</span>
    </a>

    <nav class="hidden items-center gap-5 text-sm font-bold xl:flex" aria-label="Navigasi utama">
      {#each links as link}
        <a class={`border-b-2 py-7 transition-colors hover:text-clay ${isActive(link[0]) ? 'border-clay text-clay' : 'border-transparent'}`} href={link[0]} aria-current={isActive(link[0]) ? 'page' : undefined}>{link[1]}</a>
      {/each}
      <a class="button-primary min-h-10 px-4 py-2" href="/kontak" aria-current={isActive('/kontak') ? 'page' : undefined}>Kontak <span aria-hidden="true">↗</span></a>
    </nav>

    <details class="relative xl:hidden">
      <summary class="grid min-h-11 min-w-11 cursor-pointer list-none place-items-center border border-ink text-lg" aria-label="Buka navigasi">☰</summary>
      <nav class="absolute right-0 top-[calc(100%+0.65rem)] z-20 grid w-64 gap-1 border border-stone bg-cloud p-3" aria-label="Navigasi mobile">
        {#each links as link}
          <a class={`p-3 text-sm font-bold hover:bg-mist ${isActive(link[0]) ? 'bg-mist text-clay' : ''}`} href={link[0]} aria-current={isActive(link[0]) ? 'page' : undefined}>{link[1]}</a>
        {/each}
        <a class="button-primary mt-2" href="/kontak" aria-current={isActive('/kontak') ? 'page' : undefined}>Kontak</a>
      </nav>
    </details>
  </div>
</header>

{@render children()}

<a class="fixed bottom-5 right-5 z-30 grid min-h-11 min-w-11 place-items-center border border-ink bg-ink text-lg text-white transition-[transform,background-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" href="#content" aria-label="Kembali ke atas">↑</a>

<footer class="bg-ink text-white">
  <div class="page-shell grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr]">
    <div>
      <p class="font-display text-3xl font-bold tracking-[-0.04em]">Ruang yang lebih siap untuk dipakai.</p>
      <p class="mt-4 max-w-lg leading-7 text-white/70">HD Karya Bandung membantu menyusun pekerjaan konstruksi, renovasi, dan interior dengan percakapan awal yang terarah.</p>
    </div>
    <div class="grid content-start gap-3 text-sm md:justify-self-end">
      <a class="font-bold text-clay hover:text-white" href="/kontak">Mulai konsultasi ↗</a>
      {#each links as link}
        <a class="text-white/75 hover:text-white" href={link[0]}>{link[1]}</a>
      {/each}
    </div>
  </div>
  <div class="border-t border-white/15"><div class="page-shell py-5 text-xs text-white/60">© {new Date().getFullYear()} HD Karya Bandung</div></div>
</footer>
