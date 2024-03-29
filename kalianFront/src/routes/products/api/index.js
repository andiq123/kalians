import { getReq } from '$lib/api';
import { GetProductsEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = ({ locals, url }) => {
	const token = locals['token'];
	return getReq(GetProductsEndPoint, url.searchParams, token);
};
