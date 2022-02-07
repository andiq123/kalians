<script>
	import { createEventDispatcher } from 'svelte';
	export let cart;
	const dispatch = createEventDispatcher();
</script>

<div class="card shadow-2xl rounded-lg h-fit">
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
							Pret: {cartItem.product?.price} Lei x{cartItem.quantity} = {cartItem.product?.price *
								cartItem.quantity} Lei
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
	<button
		disabled={cart.status !== 'pending'}
		on:click={() => dispatch('submit', { id: cart.id })}
		class="btn btn-primary"
		class:loading={cart.loading}>Complete</button
	>
</div>
