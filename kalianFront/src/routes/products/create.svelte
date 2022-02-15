<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch('/categories/api');

		if (res.ok) {
			return {
				props: {
					categories: await res.json()
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
			error: new Error('Could not load data')
		};
	}
</script>

<script>
	import { oneAlertInfo, oneAlertSuccess } from '../../services/alerts';

	import { fly } from 'svelte/transition';

	export let categories;
	export let error;

	let loading = false;
	let product = {
		name: '',
		description: '',
		price: 0,
		inStockQuantity: 0,
		categoryId: '0'
	};
	let image;
	let photoSrc;

	const resetForm = () => {
		product = {
			name: '',
			description: '',
			price: 0,
			inStockQuantity: 0,
			categoryId: '0'
		};
		photoSrc = '';
	};

	$: formValid = Object.values(product).every((value) => {
		if (typeof value === 'string') {
			return value.length > 0 && value !== '0';
		}
		if (typeof value === 'number') {
			return value > 0;
		}
		return true;
	});

	const uploadedFile = (e) => {
		const file = e.target.files[0];
		image = file;
		photoSrc = URL.createObjectURL(file);
	};

	const onSubmit = async (e) => {
		loading = true;
		await postProduct(product);
		loading = false;
		resetForm();
	};

	const postProduct = async (product) => {
		const res = await fetch('api/create', {
			method: 'POST',
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) return;
		const productCreated = await res.json();
		oneAlertSuccess('Product Created...');

		if (!image) return;
		oneAlertInfo('Uploading Image...');

		const formData = new FormData();
		formData.append('file', image);

		const photoRes = await fetch(`api/photo_${productCreated.id}`, {
			method: 'POST',
			body: formData
		});

		if (photoRes.ok) {
			oneAlertSuccess('Image uploaded...');
		}
	};
</script>

<svelte:head>
	<title>Create Product</title>
</svelte:head>

{#if error}
	<p>No categories found</p>
{:else}
	<form
		class="form mx-auto lg:mt-5 w-min mb-24 lg:mb-0"
		on:submit|preventDefault={onSubmit}
		enctype="multipart/form-data"
		in:fly={{ y: -30 }}
	>
		<div class="p-5 lg:p-10 card bg-base-200 gap-5">
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
						class="input input-bordered input-sm  w-full"
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
					<span>Bucăți</span>
				</label>
			</div>
			<select
				bind:value={product.categoryId}
				class="select select-bordered select-primary w-full max-w-xs"
			>
				<option disabled selected value="0">Select a category</option>
				{#each categories as category (category.id)}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
			<div class="flex items-center gap-x-5">
				<div class="shrink-0">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						class="h-16 w-16 object-cover rounded-full"
						src={photoSrc || '/no-product-image.png'}
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
				<button disabled={!formValid} class="btn btn-primary" type="submit" class:loading
					>Adauga</button
				>
			</div>
		</div>
	</form>
{/if}

<style>
</style>
