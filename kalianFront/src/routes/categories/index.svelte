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

		return {};
	}
</script>

<script>
	import { CreateCategory, DeleteCategory } from '../../services/categories';
	import { GetCategoriesEndPoint } from '../../endpoints/api-endpoints';
	import CreateModal from '$lib/categories/create-modal.svelte';
	import Category from '$lib/categories/Category.svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	export let categories = [];

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
		console.log(id);
		await DeleteCategory(id);
		categories = categories.filter((category) => category.id !== id);
	};

	let showModal = false;
</script>

<div class="w-fit mx-auto" in:fly={{ y: -30 }}>
	<button class="btn btn-primary my-5 w-full" on:click={() => (showModal = true)}>Crează</button>
	<div class="flex flex-col scroll-my-10">
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
