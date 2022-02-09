/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async () => {
	const headers = {
		'set-cookie': 'token= ; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
	};

	return {
		status: 200,
		headers,
		body: {}
	};
};
