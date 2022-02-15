<script context="module">
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
			error: new Error(`Failed to load categories: ${res.status}`)
		};
	}
</script>

<script>
	import CreateModal from '$lib/categories/create-modal.svelte';
	import Category from '$lib/categories/category.svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	export let categories = [];
	import { onMount } from 'svelte';
	import { manyAlertsError } from '../../services/alerts';

	const createCategory = async ({ detail: { name } }) => {
		const res = await fetch('/categories/api/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		});
		const category = await res.json();

		categories = [...categories, category];
		showModal = false;
	};

	const deleteCategory = async ({ detail }) => {
		const { id } = detail;
		const res = await fetch(`categories/api/delete_${id}`);
		if (res.ok) {
			categories = categories.filter((category) => category.id !== id);
		} else {
			const data = await res.json();
			manyAlertsError([data.message]);
		}
	};

	let showModal = false;
	let screenHeight;
	onMount(async () => {
		screenHeight = window.innerHeight - 150;
	});
</script>

<svelte:head>
	<title>Categories</title>
</svelte:head>

<div class="w-fit mx-auto h-min" in:fly={{ y: -30 }}>
	<button class="btn btn-primary my-5 w-full" on:click={() => (showModal = true)}>Crează</button>
	<div class="flex flex-col overflow-auto" style="height:{screenHeight}px;">
		{#each categories as category (category.id)}
			<div animate:flip>
				<Category {category} on:delete={deleteCategory} />
			</div>
		{/each}
	</div>
</div>

{#if showModal}
	<CreateModal on:create={createCategory} on:close={() => (showModal = false)} />
{/if}

<style>
	/* width */
	::-webkit-scrollbar {
		width: 10px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #790dff;
		border-radius: 10px;
	}
</style>
