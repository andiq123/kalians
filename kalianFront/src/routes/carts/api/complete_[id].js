/** @type {import('@sveltejs/kit').RequestHandler} */

import { getReq } from '$lib/api';
import { GetCartsEndPoint } from '$lib/api-endpoints';

export const get = ({ locals, params: { id } }) => {
	const token = locals['token'];
	return getReq(`${GetCartsEndPoint}/${id}`, null, token);
};
