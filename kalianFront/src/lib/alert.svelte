<script>
	import { alerts } from '../stores';
	import { fly } from 'svelte/transition';

	let alertsToShow = [];

	let timeout = 3000;
	let show = false;
	let timeoutRef;
	const start = () => {
		show = true;
		if (timeoutRef) {
			clearTimeout(timeoutRef);
		}
		timeoutRef = setTimeout(() => {
			show = false;
			alerts.set([]);
		}, timeout);
	};

	alerts.subscribe((alerts) => {
		alertsToShow = alerts;
		if (alertsToShow.length > 0) {
			start();
		}
	});
</script>

{#if show}
	{#each alertsToShow as alert, i (alert)}
		<div
			class="alert fixed w-96 right-0 mx-auto z-50"
			class:alert-success={alert.type === 'success'}
			class:alert-error={alert.type === 'error'}
			class:alert-info={alert.type === 'info'}
			style="top:{i * 60}px;"
			transition:fly={{ y: 20, duration: 500 }}
		>
			<div class="flex-1">
				{#if alert.type === 'error'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="w-6 h-6 mx-2 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
						/>
					</svg>
				{/if}
				<label for="error">{alert.title}</label>
			</div>
		</div>
	{/each}
{/if}

<style>
</style>
