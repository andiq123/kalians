<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<div class="card shadow-2xl h-fit mx-auto my-20">
	<h1>{title}</h1>
	<div class="card-title p-10">Pagina nu exista, sau lipsesc datele...</div>
</div>
