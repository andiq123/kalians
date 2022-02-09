import { postReq } from '$lib/api';
import { PostLoginEndPoint } from '$lib/api-endpoints';
import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async ({ request }) => {
	const data = await request.json();

	const res = await postReq(PostLoginEndPoint, data);

	if (!res.ok) {
		return {
			status: res.status,
			body: {
				message: 'Invalid Credentials'
			}
		};
	}

	const token = res.body.token;
	const headers = {
		'set-cookie': cookie.serialize('token', token, {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
	};
	return {
		status: 200,
		headers,
		body: {
			token
		}
	};
};
