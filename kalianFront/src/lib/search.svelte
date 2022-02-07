<script lang="ts">
	import { onMount } from 'svelte';
	let value = '';
	let input: HTMLInputElement;
	let anchorTag;
	export let searchBy = 'name';

	onMount(() => {
		input.focus();
	});
</script>

<div class="form-control flex flex-row my-10 w-fit mx-auto gap-5">
	<input
		bind:this={input}
		type="text"
		bind:value
		class="input input-primary"
		placeholder="Cauta dupa {searchBy}..."
		on:keydown={(e) => e.key === 'Enter' && anchorTag.click()}
	/>
	<a sveltekit:prefetch href="?{searchBy}={value}" bind:this={anchorTag} class="btn btn-primary"
		>Cauta</a
	>
</div>
