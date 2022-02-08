import { getReq } from '$lib/api';
import { GetProductsEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = ({ locals, params: { id, status } }) => {
	const token = locals['token'];
	return getReq(`${GetProductsEndPoint}/${status}/${id}`, null, token);
};
