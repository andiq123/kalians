<script>
	import Alert from '$lib/alert.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import '../app.css';
</script>

<header>
	<Alert />
</header>

<main class="flex">
	<Sidebar />
	<slot />
</main>
