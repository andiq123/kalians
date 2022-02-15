<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, url }) {
		const httpParams = new URLSearchParams();
		httpParams.append('limit', url.searchParams.get('limit') || '5');
		httpParams.append('offset', url.searchParams.get('offset') || '0');
		httpParams.append('name', url.searchParams.get('name') || '');

		const res = await fetch(`/products/api?${httpParams.toString()}`);
		if (res.ok) {
			const jsonData = await res.json();
			return {
				props: {
					pagedResult: jsonData
				}
			};
		}
		if (res.status === 401) {
			return {
				status: 301,
				redirect: '/auth?redirect=true'
			};
		}
		return {
			status: res.status,
			error: new Error('Products not found')
		};
	}
</script>

<script lang="ts">
	import Edit from '$lib/products/edit-modal.svelte';
	import Product from '$lib/products/product.svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Pagination from '$lib/pagination.svelte';
	import { oneAlertInfo, oneAlertSuccess } from '../../services/alerts';

	export let pagedResult;

	let productToEdit;
	const editProduct = ({ detail }) => {
		const { product } = detail;
		productToEdit = product;
	};

	const increment = async ({ detail: { id } }) => {
		const res = await fetch(`/products/api/${id}_increment`);
		const incrementedProduct = await res.json();
		updateProduct(incrementedProduct);
	};

	const decrement = async ({ detail: { id } }) => {
		const res = await fetch(`/products/api/${id}_decrement`);
		const incrementedProduct = await res.json();
		updateProduct(incrementedProduct);
	};

	const deleteProduct = async ({ detail: { id } }) => {
		const product = pagedResult.items.find((x) => x.id === id);
		product.loading = true;
		const res = await fetch(`/products/api/delete_${id}`);
		if (res.status === 200) {
			filterProducts(id);
		}
	};

	const onUpdate = async ({ detail: { product, image } }) => {
		if (image) {
			oneAlertInfo('Uploading Image...');
			const formData = new FormData();
			formData.append('file', image);

			const photoRes = await fetch(`/products/api/photo_${product.id}`, {
				method: 'POST',
				body: formData
			});

			if (photoRes.ok) {
				oneAlertSuccess('Image uploaded...');
			}
		}
		product.image = undefined;

		const data = await fetch(`/products/api/update_${product.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product)
		});
		const productReturned = await data.json();

		updateProduct(productReturned);
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
		const res = await fetch('categories/api');
		return await res.json();
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

<div class="mx-auto lg:mb-10 h-min mt-2 p-0 mb-32" in:fly={{ y: -20, duration: 200 }}>
	<div class="flex lg:flex-row flex-col items-center w-min mx-auto gap-10">
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

{#await getCategories() then categories}
	{#if productToEdit}
		<Edit
			{categories}
			product={productToEdit}
			on:close={() => (productToEdit = undefined)}
			on:update={onUpdate}
		/>
	{/if}
{/await}

<style>
</style>
