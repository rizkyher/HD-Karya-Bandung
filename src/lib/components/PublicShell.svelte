<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  let { children }: { children: import('svelte').Snippet } = $props();
  const links = [
    ['/layanan', 'Layanan'],
    ['/proyek', 'Proyek'],
    ['/galeri', 'Galeri'],
    ['/artikel', 'Artikel'],
    ['/tentang-kami', 'Tentang']
  ];
  const proofLinks = [
    ['/testimoni', 'Testimoni'],
    ['/mitra', 'Klien & partner'],
    ['/sertifikasi', 'Sertifikasi']
  ];

  let menuOpen = $state(false);
  let showBackToTop = $state(false);
  const isActive = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
  const closeMenu = () => (menuOpen = false);

  onMount(() => {
    const updateBackToTop = () => (showBackToTop = window.scrollY > 480);
    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    return () => window.removeEventListener('scroll', updateBackToTop);
  });
</script>

<a class="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-50 focus:bg-white focus:p-3 focus:text-ink" href="#content">Lewati ke konten utama</a>

<header class="sticky top-0 z-50 border-b border-stone bg-cloud/95 backdrop-blur">
  <div class="page-shell flex min-h-20 items-center justify-between gap-5">
    <a href="/" class="flex items-center gap-3 font-display text-lg font-extrabold tracking-[-0.04em]" aria-label="Jasa Perbaikan Bandung, beranda">
      <span class="brand-mark" aria-hidden="true"><img src="/assets/jasa-perbaikan-bandung-logo.png" alt="" width="1131" height="1600" /></span>
      <span>Jasa Perbaikan<br />Bandung</span>
    </a>

    <nav class="hidden items-center gap-4 text-sm font-bold xl:flex" aria-label="Navigasi utama">
      {#each [...links, ...proofLinks] as link}
        <a class={`border-b-2 py-7 transition-colors hover:text-clay ${isActive(link[0]) ? 'border-clay text-clay' : 'border-transparent'}`} href={link[0]} aria-current={isActive(link[0]) ? 'page' : undefined}>{link[1]}</a>
      {/each}
      <a class="button-primary min-h-10 px-4 py-2" href="/kontak" aria-current={isActive('/kontak') ? 'page' : undefined}>Kontak <span aria-hidden="true">↗</span></a>
    </nav>

    <button class="grid min-h-11 min-w-11 cursor-pointer place-items-center border border-ink transition-[background-color,color,transform] duration-200 active:scale-95 xl:hidden" type="button" aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'} onclick={() => (menuOpen = !menuOpen)}>
      {#if menuOpen}
        <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 fill-none stroke-current stroke-2"><path d="m6 6 12 12M18 6 6 18" /></svg>
      {:else}
        <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 fill-none stroke-current stroke-2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      {/if}
    </button>
  </div>
</header>

{#if menuOpen}
  <button class="fixed inset-x-0 bottom-0 top-20 z-40 bg-ink/30 backdrop-blur-[1px] xl:hidden" type="button" aria-label="Tutup navigasi" onclick={closeMenu}></button>
  <nav id="mobile-navigation" data-lenis-prevent class="fixed inset-x-3 top-[5.5rem] z-50 grid max-h-[calc(100dvh-6.5rem)] gap-1 overflow-y-auto border border-stone bg-cloud p-3 shadow-[0_1.5rem_3rem_rgba(8,18,12,0.16)] xl:hidden" aria-label="Navigasi mobile">
    <p class="eyebrow px-3 pb-2 pt-1 text-clay">Jelajahi website</p>
    {#each [...links, ...proofLinks] as link}
      <a class={`p-3 text-sm font-bold transition-colors duration-200 hover:bg-mist ${isActive(link[0]) ? 'bg-mist text-clay' : ''}`} href={link[0]} aria-current={isActive(link[0]) ? 'page' : undefined} onclick={closeMenu}>{link[1]}</a>
    {/each}
    <a class="button-primary mt-2" href="/kontak" aria-current={isActive('/kontak') ? 'page' : undefined} onclick={closeMenu}>Konsultasi gratis <span aria-hidden="true">↗</span></a>
  </nav>
{/if}

{@render children()}

{#if showBackToTop}
  <a class="fixed bottom-20 right-4 z-30 grid min-h-11 min-w-11 place-items-center border border-ink bg-ink text-lg text-white transition-[transform,background-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:bottom-5 md:right-5" href="#content" aria-label="Kembali ke atas">
    <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 fill-none stroke-current stroke-2"><path d="M12 19V5m0 0-5 5m5-5 5 5" /></svg>
  </a>
{/if}

{#if !menuOpen}
  <aside class="mobile-action-dock fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-stone bg-cloud/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden" aria-label="Aksi cepat">
    <a class="button-secondary min-h-11 px-3 text-xs" href="https://wa.me/6281222336489" target="_blank" rel="noreferrer">Chat WhatsApp</a>
    <a class="button-primary min-h-11 px-3 text-xs" href="/kontak">Konsultasi <span aria-hidden="true">↗</span></a>
  </aside>
{/if}

<footer class="bg-ink pb-20 text-white md:pb-0">
  <div class="page-shell grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr]">
    <div>
      <p class="font-display text-3xl font-bold tracking-[-0.04em]">Ruang yang lebih siap untuk dipakai.</p>
      <p class="mt-4 max-w-lg leading-7 text-white/70">Jasa Perbaikan Bandung membantu menyusun pekerjaan perbaikan, renovasi, dan interior dengan percakapan awal yang terarah.</p>
    </div>
    <div class="grid content-start gap-3 text-sm md:justify-self-end">
      <a class="font-bold text-clay hover:text-white" href="https://wa.me/6281222336489" target="_blank" rel="noreferrer">WhatsApp 081222336489 ↗</a>
      <a class="text-white/75 hover:text-white" href="mailto:Jasaperbaikanbandung@gmail.com">Jasaperbaikanbandung@gmail.com</a>
      <address class="max-w-xs not-italic text-white/75">Jl. Mukodar Tengah No. 240, Cibeureum, Cimahi Selatan, Kota Cimahi</address>
      {#each [...links, ...proofLinks] as link}
        <a class="text-white/75 hover:text-white" href={link[0]}>{link[1]}</a>
      {/each}
    </div>
  </div>
  <div class="border-t border-white/15"><div class="page-shell py-5 text-xs text-white/60">© {new Date().getFullYear()} Jasa Perbaikan Bandung</div></div>
</footer>
