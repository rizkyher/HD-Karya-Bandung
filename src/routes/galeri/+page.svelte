<script lang="ts">
  import ContentGrid from '$lib/components/ContentGrid.svelte';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Galeri | Jasa Perbaikan Bandung</title>
  <meta name="description" content="Galeri dokumentasi pekerjaan Jasa Perbaikan Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Galeri" title="Dokumentasi untuk melengkapi cerita proyek." description="Media yang ditampilkan melengkapi informasi proyek dan pekerjaan yang tersedia." />
    <section class="page-shell py-16 sm:py-20 lg:py-24"><ContentGrid items={data.items} emptyTitle="Galeri sedang disiapkan" emptyBody="Dokumentasi akan ditampilkan ketika konteksnya sudah siap dipublikasikan." /></section>
  </main>
</PublicShell>
