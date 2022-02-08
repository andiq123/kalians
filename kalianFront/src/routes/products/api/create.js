import { postReq } from '$lib/api';
import { GetProductsEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async ({ request, locals }) => {
	const body = await request.json();
	const token = locals['token'];
	return postReq(GetProductsEndPoint, body, token);
};
