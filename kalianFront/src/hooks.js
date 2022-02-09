import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const token = cookies['token'] || '';

	if (token.length > 0) {
		event.locals['token'] = token;
	} else {
		event.locals['token'] = undefined;
	}

	return await resolve(event);
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = (request) => {
	const token = request.locals['token'] || '';
	return { token };
};
