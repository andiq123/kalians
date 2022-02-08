import { getReq } from '$lib/api';
import { GetCategoriesEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = ({ locals }) => {
	const token = locals['token'];
	return getReq(GetCategoriesEndPoint, null, token);
};
