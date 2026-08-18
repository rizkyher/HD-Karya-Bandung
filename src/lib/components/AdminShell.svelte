<script lang="ts">
  import AdminTutorial from '$lib/components/AdminTutorial.svelte';
  let { user, children }: { user: { name: string; role: string }; children: import('svelte').Snippet } = $props();
  const primary = [['/admin', 'Ringkasan'], ['/admin/konten', 'Konten website'], ['/admin/layanan', 'Layanan'], ['/admin/proyek', 'Portofolio'], ['/admin/artikel', 'Artikel'], ['/admin/galeri', 'Galeri'], ['/admin/media', 'Media'], ['/admin/pesan-masuk', 'Inquiry']];
  const management = [['/admin/testimoni', 'Testimoni'], ['/admin/klien', 'Klien & partner'], ['/admin/sertifikasi', 'Sertifikasi'], ['/admin/pengaturan', 'Pengaturan']];
  const superAdmin = [['/admin/pengguna', 'Pengguna'], ['/admin/audit-log', 'Audit log']];
</script>

<div class="min-h-screen bg-mist text-ink"><aside class="hidden fixed inset-y-0 left-0 z-20 w-72 border-r border-forest/20 bg-ink px-5 py-6 text-white lg:flex lg:flex-col"><a class="flex items-center gap-3 font-display text-xl font-extrabold tracking-[-0.04em]" href="/admin"><span class="brand-mark" aria-hidden="true"><img src="/assets/jasa-perbaikan-bandung-logo.png" alt="" width="1131" height="1600" /></span><span>Jasa Perbaikan<br />Bandung</span></a><p class="mt-10 px-3 text-xs font-bold tracking-[0.1em] text-white/45 uppercase">Kelola website</p><nav class="mt-3 grid gap-1">{#each primary as item}<a class="rounded-md px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white" href={item[0]}>{item[1]}</a>{/each}</nav><p class="mt-7 px-3 text-xs font-bold tracking-[0.1em] text-white/45 uppercase">Pengaturan</p><nav class="mt-3 grid gap-1">{#each management as item}<a class="rounded-md px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white" href={item[0]}>{item[1]}</a>{/each}{#if user.role === 'SUPER_ADMIN'}{#each superAdmin as item}<a class="rounded-md px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white" href={item[0]}>{item[1]}</a>{/each}{/if}</nav><div class="mt-auto border-t border-white/15 pt-5"><p class="px-3 text-sm font-bold">{user.name}</p><p class="mt-1 px-3 text-xs text-white/55">{user.role.replace('_', ' ')}</p><form method="POST" action="/admin/logout" class="mt-4"><button class="w-full rounded-md border border-white/25 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-ink">Keluar</button></form></div></aside><div class="lg:pl-72"><header class="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-stone bg-cloud/95 px-5 backdrop-blur sm:px-8"><details class="relative lg:hidden"><summary class="cursor-pointer list-none border border-ink px-3 py-2 text-sm font-bold">Menu</summary><nav class="absolute left-0 top-[calc(100%+0.5rem)] grid w-64 gap-1 border border-stone bg-white p-3 shadow-lg">{#each [...primary, ...management, ...(user.role === 'SUPER_ADMIN' ? superAdmin : [])] as item}<a class="p-3 text-sm font-bold hover:bg-mist" href={item[0]}>{item[1]}</a>{/each}</nav></details><p class="hidden text-sm font-medium text-forest sm:block">Workspace admin</p><a class="text-sm font-bold underline decoration-stone underline-offset-4 hover:text-clay" href="/" target="_blank" rel="noreferrer">Lihat website ↗</a></header><main class="p-5 sm:p-8 lg:p-10">{@render children()}</main></div></div><AdminTutorial />

<style>
  @media (min-width: 1024px) {
    aside {
      height: 100dvh;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-gutter: stable;
    }
  }
</style>
