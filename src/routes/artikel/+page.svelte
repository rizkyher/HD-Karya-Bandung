<script lang="ts">
  import ContentGrid from '$lib/components/ContentGrid.svelte';
  import PageIntro from '$lib/components/PageIntro.svelte';
  import PublicShell from '$lib/components/PublicShell.svelte';

  let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
  <title>Artikel | HD Karya Bandung</title>
  <meta name="description" content="Catatan praktis konstruksi, renovasi, interior, material dan utilitas dari HD Karya Bandung." />
</svelte:head>

<PublicShell>
  <main id="content">
    <PageIntro label="Artikel" title="Catatan praktis sebelum Anda membangun atau merenovasi." description="Panduan yang membantu Anda menimbang kebutuhan, proses, material, dan ruang." />
    <section class="page-shell py-16 sm:py-20 lg:py-24"><ContentGrid items={data.items} emptyTitle="Artikel sedang disiapkan" emptyBody="Kami menerbitkan catatan yang cukup lengkap untuk membantu keputusan, bukan sekadar mengejar kata kunci." /></section>
  </main>
</PublicShell>
