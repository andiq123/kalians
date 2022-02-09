<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch('/auth/api/signout', {
			method: 'POST'
		});
		if (res.ok) {
			return {
				status: 200
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load url`)
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	onMount(() => {
		session.update(() => null);
		goto('/auth/');
	});
</script>
