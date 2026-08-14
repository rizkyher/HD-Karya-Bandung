<script lang="ts">
  import Lenis from 'lenis';
  import 'lenis/dist/lenis.css';
  import { onMount } from 'svelte';

  onMount(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: 96 },
      stopInertiaOnNavigate: true
    });

    return () => lenis.destroy();
  });
</script>
