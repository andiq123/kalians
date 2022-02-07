<script context="module">
	export async function load({ fetch, url }) {
		const urlLink = new URL(GetProductsEndPoint);
		const httpParams = new URLSearchParams();
		// httpParams.append('limit', url.searchParams.get('limit') || '5');
		// httpParams.append('offset', url.searchParams.get('offset') || '0');
		// httpParams.append('name', url.searchParams.get('name') || '');
		// urlLink.search = httpParams.toString();

		const res = await fetch(urlLink.toString());

		if (res.ok) {
			const jsonData = await res.json();
			return {
				props: {
					pagedResult: jsonData
				}
			};
		}

		return {
			status: res.status,
			error: new Error('Could not load data')
		};
	}
</script>

<script lang="ts">
	import Edit from '$lib/products/edit-modal.svelte';
	import Product from '$lib/products/product.svelte';
	import { Decrement, Increment, ProductUpdate } from '../../services/products';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Pagination from '$lib/pagination.svelte';
	import { GetProductsEndPoint } from '../../services/endpoints/api-endpoints';
	import { CategoriesGet } from '../../services/categories';

	export let pagedResult;
	const baseUrl = import.meta.env.VITE_BASE_URL;

	let productToEdit;
	const editProduct = ({ detail }) => {
		const { product } = detail;
		productToEdit = product;
	};

	const increment = async ({ detail }) => {
		const { id } = detail;
		const product = await Increment(id);
		updateProduct(product);
	};

	const decrement = async ({ detail }) => {
		const { id } = detail;
		const product = await Decrement(id);
		updateProduct(product);
	};

	const deleteProduct = async ({ detail }) => {
		const { id } = detail;
		const product = pagedResult.items.find((x) => x.id === id);
		product.loading = true;
		const res = await fetch(baseUrl + `products/${id}`, { method: 'DELETE' });
		if (res.status === 200) {
			filterProducts(id);
		}
	};

	const onUpdate = async ({ detail }) => {
		const { product } = detail;
		product.image = undefined;
		const data = await ProductUpdate(product);
		updateProduct(data);
		productToEdit = undefined;
	};

	//local
	const updateProduct = (product) => {
		pagedResult = {
			...pagedResult,
			items: pagedResult.items.map((x) => {
				if (x.id === product.id) {
					return product;
				}
				return x;
			})
		};
	};

	const filterProducts = (id) => {
		pagedResult = {
			items: pagedResult.items.filter((x) => x.id !== id),
			count: pagedResult.count - 1
		};
	};

	const getCategories = async () => {
		const data = await CategoriesGet();
		return data;
	};

	// prefetching
	$: images = Object.values(pagedResult.items).map((x: any) => x.image);
</script>

<svelte:head>
	<title>Products</title>
	{#each images as image}
		{#if image}
			<link rel="preload" as="image" href={image} />
		{/if}
	{/each}
</svelte:head>

<div class="mx-auto mb-10 h-min mt-2 p-0 " in:fly={{ y: -20, duration: 200 }}>
	<div class="flex flex-rows gap-10 h-min">
		{#each pagedResult.items as product (product.id)}
			<div animate:flip class="w-min">
				<Product
					{product}
					on:decrement={decrement}
					on:deleteProduct={deleteProduct}
					on:editProduct={editProduct}
					on:increment={increment}
				/>
			</div>
		{:else}
			<div class="mx-auto" transition:fly={{ y: -50 }}>
				<div class="card-body">
					<h2 class="card-title capitalize">No carts found</h2>
				</div>
			</div>
		{/each}
	</div>
	<Pagination totalItems={pagedResult.count} />
</div>

<!-- {#await getCategories() then categories}
	<p>{categories.length}</p>
	{#if productToEdit}
		<Edit
			{categories}
			product={productToEdit}
			on:close={() => (productToEdit = undefined)}
			on:update={onUpdate}
		/>
	{/if}
{/await} -->
<style>
</style>
