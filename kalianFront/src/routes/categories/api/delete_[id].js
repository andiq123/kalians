import { deleteReq } from '$lib/api';
import { GetCategoriesEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ locals, params: { id } }) => {
	const token = locals['token'];
	return deleteReq(`${GetCategoriesEndPoint}/${id}`, token);
};
