<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let category;
	let loading = false;
</script>

<div class="card shadow-lg w-96">
	<div class="card-body flex flex-row justify-between">
		<p class="font-bold capitalize">{category.name}</p>
		<button
			class="btn btn-error"
			class:loading
			on:click={() => {
				loading = true;
				setTimeout(() => {
					loading = false;
				}, 1500);
				dispatch('delete', { id: category.id });
			}}>Delete</button
		>
	</div>
</div>
