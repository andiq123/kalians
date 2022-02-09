export async function genericFetch({ link, method = 'GET', data = null, token = null }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `bearer ${token}`;
	}

	const res = await fetch(link, opts);

	try {
		return {
			ok: res.ok,
			status: res.status,
			body: await res.json()
		};
	} catch (error) {
		return res;
	}
}

export function getReq(link, searchParams = null, token = null) {
	const url = new URL(link);

	if (searchParams) {
		url.search = searchParams.toString();
	}

	return genericFetch({ link: url.toString(), token });
}

export function postReq(link, body, token) {
	return genericFetch({ link, method: 'POST', data: body, token });
}

export function patchReq(link, body = null, token) {
	return genericFetch({ link, method: 'PATCH', data: body, token });
}

export function putReq(link, body = null, token) {
	return genericFetch({ link, method: 'PUT', data: body, token });
}

export function deleteReq(link, token) {
	return genericFetch({ link, method: 'DELETE', token });
}

export async function uploadImage(link, body, token) {
	const res = await fetch(link, {
		headers: {
			Authorization: 'bearer ' + token
		},
		mode: 'cors',
		method: 'POST',
		body
	});

	if (res.ok) {
		return { status: res.status };
	}
	throw ['photo could not be uploaded'];
}
