import { getReq } from '$lib/api';
import { GetCartsEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = ({ locals, url }) => {
	const token = locals['token'];

	return getReq(GetCartsEndPoint, url.searchParams, token);
};
