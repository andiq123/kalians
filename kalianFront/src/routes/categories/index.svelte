<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(GetCategoriesEndPoint);
		if (res.ok) {
			return {
				props: {
					categories: await res.json()
				}
			};
		}

		return {
			error: new Error(`Failed to load categories: ${res.status}`)
		};
	}
</script>

<script>
	import { CreateCategory, DeleteCategory } from '../../services/categories';
	import { GetCategoriesEndPoint } from '../../services/endpoints/api-endpoints';
	import CreateModal from '$lib/categories/create-modal.svelte';
	import Category from '$lib/categories/Category.svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	export let categories = [];
	import { onMount } from 'svelte';

	const createCategory = async ({ detail }) => {
		const { name } = detail;
		const category = await CreateCategory(name);
		if (category) {
			categories = [...categories, category];
			showModal = false;
		}
	};

	const deleteCategory = async ({ detail }) => {
		const { id } = detail;
		await DeleteCategory(id);
		categories = categories.filter((category) => category.id !== id);
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
