<script lang="ts">import ContentDetail from '$lib/components/ContentDetail.svelte'; let { data }: { data: import('./$types').PageData } = $props();</script><ContentDetail item={data.item} />
