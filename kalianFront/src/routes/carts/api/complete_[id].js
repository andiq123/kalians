/** @type {import('@sveltejs/kit').RequestHandler} */

import { putReq } from '$lib/api';
import { GetCartsEndPoint } from '$lib/api-endpoints';

export const get = ({ locals, params: { id } }) => {
	const token = locals['token'];
	return putReq(`${GetCartsEndPoint}/${id}`, null, token);
};
