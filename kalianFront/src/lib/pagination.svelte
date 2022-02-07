<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	export let totalItems = 0;

	$: nameSearch = $page.url.searchParams.get('name') || '';
	$: limit = $page.url.searchParams.get('limit') || totalItems >= 5 ? 5 : totalItems;
	$: totalPages = Math.floor((totalItems + +limit - 1) / +limit) || 0;
	$: offset = $page.url.searchParams.get('offset');
	$: currentPage = +offset / +limit + 1;
</script>

{#if totalPages > 0}
	<div class="btn-group my-10 mx-auto w-fit" in:fly={{ y: -20 }}>
		{#each Array(totalPages) as _, i}
			<a
				sveltekit:noscroll
				sveltekit:prefetch
				href="?limit={limit}&offset={i * +limit}&name={nameSearch}"
				class="btn"
				class:btn-active={i + 1 === currentPage}>{i + 1}</a
			>
		{/each}
	</div>
{/if}
