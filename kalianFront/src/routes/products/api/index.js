import { getReq } from '$lib/api';
import { GetProductsEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = ({ locals }) => {
	const token = locals['token'];
	return getReq(GetProductsEndPoint, null, token);
};
