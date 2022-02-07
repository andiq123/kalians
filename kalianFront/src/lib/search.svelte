<script lang="ts">
	import { onMount } from 'svelte';
	let value = '';
	let input: HTMLInputElement;
	let anchorTag;
	export let searchBy = 'name';
	export let type = 'text';
	onMount(() => {
		input.focus();
	});
	const handleInput = (e) => {
		value = e.target.value;
	};
</script>

<div class="form-control flex flex-row my-10 w-fit mx-auto gap-5">
	<input
		bind:this={input}
		{type}
		class="input input-primary"
		placeholder="Cauta dupa {searchBy}..."
		on:input={handleInput}
		on:keydown={(e) => e.key === 'Enter' && anchorTag.click()}
	/>
	<a sveltekit:prefetch href="?{searchBy}={value}" bind:this={anchorTag} class="btn btn-primary"
		>Cauta</a
	>
</div>
