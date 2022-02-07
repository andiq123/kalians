<script context="module">
	export async function load({ fetch, url }) {
		const baseUrl = import.meta.env.VITE_BASE_URL;
		const link = baseUrl + 'carts';
		const urlLink = new URL(link);
		const httpParams = new URLSearchParams();
		httpParams.append('limit', url.searchParams.get('limit') || '4');
		httpParams.append('offset', url.searchParams.get('offset') || '0');
		httpParams.append('id', url.searchParams.get('id') || '');

		urlLink.search = httpParams.toString();
		const res = await fetch(urlLink.toString());

		if (res.ok) {
			return {
				props: {
					pagedResult: await res.json()
				}
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
	export let pagedResult;
</script>

<div class="grid grid-rows-1 mx-auto p-5" in:fly={{ y: -30 }}>
	<div class="flex flex-row flex-wrap gap-10">
		{#each pagedResult.items as cart (cart.id)}
			<div class="card shadow-2xl rounded-lg h-fit" animate:flip>
				<div class="card-body">
					<div class="flex flex-row justify-between">
						<h2 class="card-title capitalize">#{cart.id}</h2>
						<h2 class="card-title capitalize">{cart.status}</h2>
					</div>
					<div>
						<h2>Products:</h2>
						<div class="divide-y my-5">
							{#each cart.cartItems as cartItem (cartItem.id)}
								<div class="flex flex-row justify-between my-2">
									<p>Produs: <span class="capitalize">{cartItem.product?.name}</span></p>
									<p>
										Pret: {cartItem.product?.price} Lei x{cartItem.quantity} = {cartItem.product
											?.price * cartItem.quantity} Lei
									</p>
								</div>
							{/each}
						</div>
					</div>
					<div class="flex flex-col justify-between">
						<p class="font-light capitalize">
							<span class="font-bold">Total Price:</span>
							{cart.totalPrice} Lei
						</p>
						<p class="capitalize"><span class="font-bold">Client:</span> {cart.clientName}</p>
						<p class="font-light capitalize">
							<span class="font-bold">Phone:</span>
							{cart.phoneNumber}
						</p>
					</div>
				</div>
				<button disabled={cart.status !== 'pending'} class="btn btn-primary">Complete</button>
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
