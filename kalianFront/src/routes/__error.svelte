<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status: status,
				message: error.message
			}
		};
	}
</script>

<script>
	import { fly } from 'svelte/transition';
	export let title;
	export let status;
</script>

<div class="card shadow-2xl h-fit mx-auto my-20" in:fly={{ y: -30 }}>
	{#if status === 401}
		<h1 class="card-title py-5 font-bold mx-auto">Neautorizat</h1>
		<div class="card-body">
			Nu ai drepturi de a vizita aceasta pagina! <span class="text-red-400 mx-auto font-bold"
				>Logheaza-te!</span
			>
		</div>
	{:else}
		<h1 class="card-title py-5 font-bold mx-auto">{title}</h1>
		<div class="card-body">Pagina nu exista, sau lipsesc datele...</div>
	{/if}
</div>
