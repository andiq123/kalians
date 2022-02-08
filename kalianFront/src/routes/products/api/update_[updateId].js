import { patchReq } from '$lib/api';
import { GetProductsEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async ({ locals, params: { updateId }, request }) => {
	const body = await request.json();
	const token = locals['token'];
	const res = await patchReq(`${GetProductsEndPoint}/${updateId}`, body, token);
	if (res.ok) {
		return { status: 200, body: res.body };
	}

	return {
		status: 404,
		body: {
			message: 'No data'
		}
	};
};
