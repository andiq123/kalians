import { postReq } from '$lib/api';
import { GetCategoriesEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async ({ locals, request }) => {
	const body = await request.json();
	const token = locals['token'];
	return postReq(GetCategoriesEndPoint, body, token);
};
