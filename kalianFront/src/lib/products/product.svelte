<script>
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	export let product;
	const dispatch = createEventDispatcher();
	let loadingDelete = false;

	const loadImage = async () => {
		const image = new Image();
		image.src = product.image;
		return new Promise((resolve) => {
			image.onload = () => resolve(image);
		});
	};
</script>

<div class="card text-center shadow-2xl w-full h-min">
	<figure class="px-5 pt-5">
		{#await loadImage()}
			<img class="rounded-xl border" src={'/no-product-image.png'} alt={product.name} />
		{:then _}
			<img
				class="rounded-xl border"
				src={product.image || '/no-product-image.png'}
				alt={product.name}
			/>
		{/await}
	</figure>
	<div class="card-body px-10">
		<h2 class="card-title capitalize">{product.name}</h2>
		<p class="font-light capitalize">
			{product.description}
		</p>

		<p>Price: {product.price} Lei</p>
		<p>
			In stock:
			{#key product.inStockQuantity}
				<span class="inline-block" in:fly={{ y: -20 }}>
					{product.inStockQuantity}
				</span>
			{/key}
		</p>

		<div class="justify-center card-actions w-30">
			<div class="flex gap-5">
				<button
					class="btn btn-primary w-16 text-center"
					class:loading={product.loadingIncrement}
					on:click={() => dispatch('increment', { id: product.id })}
				>
					{#if !product.loadingIncrement}
						<i class="fas fa-plus" />
					{/if}</button
				>
				<button
					class="btn w-16"
					class:loading={product.loadingDecrement}
					on:click={() => dispatch('decrement', { id: product.id })}
				>
					{#if !product.loadingDecrement}
						<i class="fas fa-minus" />
					{/if}
				</button>
			</div>

			<button class="btn btn-outline w-full" on:click={() => dispatch('editProduct', { product })}
				>Edit</button
			>
			<button
				class="btn btn-primary w-full"
				class:loading={loadingDelete}
				on:click={() => {
					loadingDelete = true;
					dispatch('deleteProduct', { id: product.id });
				}}>Delete</button
			>
		</div>
	</div>
</div>
