<script lang="ts">
  import ContentGrid from '$lib/components/ContentGrid.svelte';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Layanan Perbaikan & Renovasi Bandung | HD Karya Bandung</title>
  <meta name="description" content="Layanan perbaikan, renovasi, interior, dan pekerjaan luar ruang dari HD Karya Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Layanan" title="Pekerjaan yang disusun dari kebutuhan ruang Anda." description="Pilih layanan yang paling mendekati kebutuhan Anda, lalu kami bantu memetakan langkah selanjutnya." />
    <section class="page-shell py-16 sm:py-20 lg:py-24"><ContentGrid items={data.items} emptyTitle="Layanan sedang disiapkan" emptyBody="Hubungi kami untuk mendiskusikan kebutuhan perbaikan, renovasi, atau interior Anda." /></section>
  </main>
</PublicShell>
