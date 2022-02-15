import { GetCheckToken } from '$lib/api-endpoints';
import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const token = cookies['token'] || '';

	if (token.length === 0 || token === 'undefined') {
		event.locals['token'] = undefined;
	}

	if (token.length > 0) {
		const res = await fetch(GetCheckToken, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (res.ok) {
			event.locals['user'] = true;
			event.locals['token'] = token;
		} else {
			event.locals['user'] = false;
		}
	}

	return await resolve(event);
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = (request) => {
	const session = {};
	const token = request.locals['token'] || '';
	if (token) {
		Object.assign(session, { token });
	}

	const user = request.locals['user'] || false;
	if (user) {
		Object.assign(session, { user });
	}
	return session;
};
