<script context="module">
	/**	 * @type {import('@sveltejs/kit').Load} */
	export async function load({ session, url }) {
		const isFromRedirect = url.searchParams.get('redirect');
		if (!isFromRedirect && session['user']) {
			return {
				status: 301,
				redirect: '/products/redirect'
			};
		} else {
			return {
				status: 200
			};
		}
	}
</script>

<script>
	import { manyAlertsError, oneAlertSuccess } from '../../services/alerts';
	import { fly } from 'svelte/transition';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	let loading = false;
	let usernameInput;
	const creds = {
		username: '',
		password: ''
	};

	const onSubmit = async () => {
		loading = true;
		const res = await fetch('/auth/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(creds)
		});
		if (res.ok) {
			loading = false;
			oneAlertSuccess('Login Successful');
			const data = await res.json();
			session.update((x) => ({ token: data.token, user: true }));
			goto('/products');
		} else {
			loading = false;
			resetForm();
			manyAlertsError(['Invalid credentials']);
		}
	};

	const resetForm = () => {
		creds.username = '';
		creds.password = '';
		usernameInput.focus();
	};

	$: formValid = Object.values(creds).every((v) => v.length > 0);
</script>

<form
	class="form mx-auto mt-5 "
	on:submit|preventDefault={onSubmit}
	enctype="multipart/form-data"
	in:fly={{ y: -30 }}
>
	<div class="p-10 card bg-base-200 gap-5">
		<div class="form-control">
			<label class="label" for="username">
				<span class="label-text">Name</span>
			</label>
			<input
				type="text"
				bind:this={usernameInput}
				bind:value={creds.username}
				placeholder="Name"
				class="input input-ghost"
			/>
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
