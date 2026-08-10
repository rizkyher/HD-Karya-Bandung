<script lang="ts">
  let { label, title, description }: { label: string; title: string; description: string } = $props();
</script>

<section class="border-b border-stone">
  <div class="page-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end lg:py-28">
    <div>
      <p class="eyebrow text-clay">{label}</p>
      <h1 class="page-title mt-5">{title}</h1>
    </div>
    <p class="max-w-xl text-lg leading-8 text-forest lg:pb-1">{description}</p>
  </div>
</section>
