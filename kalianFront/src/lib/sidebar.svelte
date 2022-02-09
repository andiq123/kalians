<script>
	import Search from './search.svelte';
	import { fly } from 'svelte/transition';
	import { page, session } from '$app/stores';

	!!$session;
	$: pathName = $page.url.pathname;
</script>

<div class="sidebar flex flex-col bg-gray-800 h-screen w-max">
	<div class="title p-5">
		<h2 class="font-bold text-lg">Kalians</h2>
	</div>

	<div class="content p-5">
		<ul class="flex flex-col gap-5">
			{#if !!$session}
				<li>
					<a
						sveltekit:prefetch
						href="/categories"
						class:btn-active={pathName === '/categories'}
						class="btn w-full">Categories</a
					>
				</li>
				<li>
					<a
						sveltekit:prefetch
						href="/products/create"
						class:btn-active={pathName === '/products/create'}
						class="btn w-full">Create</a
					>
				</li>
				<li>
					<a
						sveltekit:prefetch
						href="/products?limit=5&offset=0"
						class:btn-active={pathName === '/products'}
						class="btn w-full">List Products</a
					>
				</li>
				<li>
					<a
						sveltekit:prefetch
						href="/carts"
						class:btn-active={pathName === '/carts'}
						class="btn w-full">Cart</a
					>
				</li>
				<li class="absolute bottom-10 ml-5">
					<a href="/auth/signout" class="btn w-full">Sign out</a>
				</li>
			{:else}
				<li>
					<a
						sveltekit:prefetch
						href="/auth/"
						class:btn-active={pathName === '/auth/'}
						class="btn w-full">Login</a
					>
				</li>
			{/if}
		</ul>

		{#if $page.url.pathname === '/products'}
			<div in:fly={{ x: -30 }}>
				<Search searchBy="name" />
			</div>
		{:else if $page.url.pathname === '/carts'}
			<div in:fly={{ x: -30 }}>
				<Search searchBy="id" type="number" />
			</div>
		{/if}
	</div>
</div>

<style>
</style>
