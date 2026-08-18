<script lang="ts">
  let { label, title, description, compact = false }: { label: string; title: string; description: string; compact?: boolean } = $props();
</script>

<section class="border-b border-stone">
  <div class={`page-shell grid gap-6 ${compact ? 'py-10 sm:py-14 lg:py-16' : 'py-16 sm:py-20 lg:py-28'} lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end`}>
    <div>
      <p class="eyebrow text-clay">{label}</p>
      <h1 class={`${compact ? 'max-w-4xl font-display text-[clamp(2.4rem,7vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.035em] text-balance' : 'page-title'} mt-4 sm:mt-5`}>{title}</h1>
    </div>
    <p class={`max-w-xl text-forest lg:pb-1 ${compact ? 'leading-7' : 'text-lg leading-8'}`}>{description}</p>
  </div>
</section>
