<script lang="ts">
  import ContentGrid from '$lib/components/ContentGrid.svelte';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Proyek | HD Karya Bandung</title>
  <meta name="description" content="Dokumentasi proyek HD Karya Bandung yang menjelaskan konteks, proses, dan hasil." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Proyek" title="Studi kasus yang menjelaskan konteks, bukan sekadar foto." description="Setiap studi kasus memuat keputusan ruang, scope, dan proses yang membentuk hasil akhir." />
    <section class="page-shell py-16 sm:py-20 lg:py-24"><ContentGrid items={data.items} emptyTitle="Studi kasus sedang disiapkan" emptyBody="Kami hanya menerbitkan proyek yang memiliki konteks dan informasi yang dapat dipertanggungjawabkan." /></section>
  </main>
</PublicShell>
