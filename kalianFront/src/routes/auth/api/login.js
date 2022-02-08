import { login } from '../../../services/auth';
import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async ({ request }) => {
	const data = await request.json();
	try {
		const { token } = await login(data);
		const headers = {
			'Set-Cookie': cookie.serialize('token', token, {
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
				message: 'Logged In'
			}
		};
	} catch (error) {
		return {
			status: 401,
			body: {
				message: 'Invalid Credentials'
			}
		};
	}
};
