import { uploadImage } from '$lib/api';
import { GetProductsEndPoint } from '$lib/api-endpoints';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async ({ request, locals, params: { id } }) => {
	const body = await request.formData();

	if (!body) {
		return {
			status: 400,
			body: {
				message: 'No file was uploaded'
			}
		};
	}
	const token = locals['token'];

	return uploadImage(`${GetProductsEndPoint}/file/${id}`, body, token);
};
