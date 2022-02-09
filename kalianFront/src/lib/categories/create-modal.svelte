<script>
	// @ts-nocheck
	import { scale, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let loading = false;
	let name = '';

	$: formValid = name.length > 0;

	function clickOutside(node) {
		const handleClick = (event) => {
			if (!node.contains(event.target)) {
				node.dispatchEvent(new CustomEvent('outclick'));
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div class="modal modal-open" transition:fade>
	<div class="modal-box" transition:scale>
		<form
			class="form flex flex-col gap-5"
			on:submit|preventDefault={() => dispatch('create', { name })}
			enctype="multipart/form-data"
		>
			<div class="form-control">
				<label class="label" for="username">
					<span class="label-text">Name</span>
				</label>
				<input type="text" bind:value={name} placeholder="Name" class="input input-ghost" />
			</div>

			<div class="form-control">
				<button
					class="btn btn-primary"
					class:loading
					disabled={!formValid}
					on:click={() => (loading = true)}
					type="submit">Crează</button
				>
			</div>
		</form>

		<div class="modal-action w-full">
			<label for="modal" class="btn w-full" on:click={() => dispatch('close')}>Close</label>
		</div>
	</div>
</div>
