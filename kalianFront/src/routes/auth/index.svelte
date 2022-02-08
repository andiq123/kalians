<script>
	import { login } from '../../services/auth';
	import { fly } from 'svelte/transition';
	let loading = false;

	const creds = {
		username: '',
		password: ''
	};

	const onSubmit = async () => {
		const res = await fetch('auth/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(creds)
		});
	};

	$: formValid = Object.values(creds).every((v) => v.length > 0);
</script>

<form
	class="form mx-auto mt-5"
	on:submit|preventDefault={onSubmit}
	enctype="multipart/form-data"
	in:fly={{ y: -30 }}
>
	<div class="p-10 card bg-base-200 gap-5">
		<div class="form-control">
			<label class="label" for="username">
				<span class="label-text">Name</span>
			</label>
			<input type="text" bind:value={creds.username} placeholder="Name" class="input input-ghost" />
		</div>
		<div class="form-control">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				bind:value={creds.password}
				placeholder="Password"
				class="input input-ghost"
			/>
		</div>

		<div class="form-control">
			<button disabled={!formValid} class="btn btn-primary" type="submit" class:loading
				>Log in</button
			>
		</div>
	</div>
</form>
