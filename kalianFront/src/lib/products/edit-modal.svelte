<script>
	// @ts-nocheck
	import { scale, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	export let categories;
	export let product;

	const dispatch = createEventDispatcher();
	let loading = false;

	let image;
	let photoSrc;

	const uploadedFile = (e) => {
		const file = e.target.files[0];
		image = file;
		photoSrc = URL.createObjectURL(file);
	};

	$: formValid = Object.values(product).every((value) => {
		if (typeof value === 'string') {
			return value.length > 0 && value !== '0';
		}
		if (typeof value === 'number') {
			return value && value > 0;
		}
		return true;
	});

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
			on:submit|preventDefault={() => dispatch('update', { product, image })}
			enctype="multipart/form-data"
		>
			<div class="form-control">
				<label class="label" for="username">
					<span class="label-text">Name</span>
				</label>
				<input type="text" bind:value={product.name} placeholder="Name" class="input input-ghost" />
			</div>
			<div class="form-control">
				<label class="label" for="description">
					<span class="label-text">Description</span>
				</label>
				<textarea
					rows="3"
					bind:value={product.description}
					placeholder="Description"
					class="input input-ghost"
				/>
			</div>
			<div class="form-control ">
				<label class="label" for="price">
					<span class="label-text">Price</span>
				</label>
				<label class="input-group input-group-sm">
					<span>Price</span>
					<input
						type="number"
						bind:value={product.price}
						min="1"
						class="input input-bordered input-sm w-full"
					/>
					<span>Lei</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label" for="quantity">
					<span class="label-text">Quantity</span>
				</label>
				<label class="input-group input-group-sm">
					<span>Quantity</span>
					<input
						type="number"
						bind:value={product.inStockQuantity}
						min="1"
						class="input input-bordered input-sm"
					/>
					<span>Bucati</span>
				</label>
			</div>
			<select
				bind:value={product.categoryId}
				class="select select-bordered select-primary w-full max-w-xs"
			>
				{#each categories as category (category.id)}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
			<div class="flex items-center gap-x-5">
				<div class="shrink-0">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						class="h-16 w-16 object-cover rounded-full"
						src={photoSrc || product.image || '/no-product-image.png'}
						alt="Current profile photo"
					/>
				</div>
				<label class="block">
					<span class="sr-only">Choose photo</span>
					<input
						type="file"
						class="block w-full text-sm text-slate-500
									file:mr-4 file:py-2 file:px-4
									file:rounded-full file:border-0
									file:text-sm file:font-semibold
									file:bg-violet-50 file:text-violet-700
									hover:file:bg-violet-100
									 "
						on:change={uploadedFile}
					/>
				</label>
			</div>
			<div class="form-control">
				<button
					class="btn btn-primary"
					class:loading
					disabled={!formValid}
					on:click={() => (loading = true)}
					type="submit">Editeaza</button
				>
			</div>
		</form>

		<div class="modal-action w-full">
			<label for="modal" class="btn w-full" on:click={() => dispatch('close')}>Close</label>
		</div>
	</div>
</div>

<style>
</style>
