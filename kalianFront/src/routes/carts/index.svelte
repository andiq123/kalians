<script context="module">
	export async function load({ fetch, url }) {
		const httpParams = new URLSearchParams();
		httpParams.append('limit', url.searchParams.get('limit') || '4');
		httpParams.append('offset', url.searchParams.get('offset') || '0');
		httpParams.append('id', url.searchParams.get('id') || '');

		const res = await fetch(`/carts/api?${httpParams.toString()}`);
		const pagedItems = await res.json();
		pagedItems.items = pagedItems.items.map((item) => {
			item.phoneNumber = '1234567890';
			return item;
		});
		if (res.ok) {
			return {
				props: {
					pagedResult: pagedItems
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
			error: new Error(`Could not load url`)
		};
	}
</script>

<script>
	import Pagination from '$lib/pagination.svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Cart from '$lib/carts/cart.svelte';

	export let pagedResult = {};

	const SetItemLoading = (id) => {
		pagedResult = {
			...pagedResult,
			items: pagedResult.items.map((item) => {
				if (item.id === id) {
					return { ...item, loading: true };
				}
				return item;
			})
		};
	};

	const onSubmit = async ({ detail: { id } }) => {
		SetItemLoading(id);
		const res = await fetch(`/carts/api/complete_${id}`);
		const cart = await res.json();
		updateCart(cart);
	};

	const updateCart = (cart) => {
		pagedResult = {
			...pagedResult,
			items: pagedResult.items.map((x) => {
				if (x.id === cart.id) {
					x.phoneNumber = '1234567890';
					return cart;
				}
				return x;
			})
		};
	};
</script>

<svelte:head>
	<title>Carts</title>
</svelte:head>

<div class="grid grid-rows-1 mx-auto p-5 mb-20 lg:mb-0" in:fly={{ y: -30 }}>
	<div class="flex flex-row flex-wrap gap-10 justify-center">
		{#each pagedResult.items as cart (cart.id)}
			<div animate:flip>
				<Cart {cart} on:submit={onSubmit} />
			</div>
		{:else}
			<div class="mx-auto" in:fly={{ y: -50 }}>
				<div class="card-body">
					<h2 class="card-title capitalize">No carts found</h2>
				</div>
			</div>
		{/each}
	</div>
	<Pagination totalItems={pagedResult.count} />
</div>

<style>
</style>
