export async function genericFetch(url, method = 'GET', body = null) {
	const res = await fetch(url, {
		mode: 'cors',
		headers:
			(body && {
				'Content-Type': 'application/json'
			}) ||
			undefined,
		method,
		body: (body && JSON.stringify(body)) || undefined
	});

	if (!body && method !== 'GET') {
		return Promise.resolve();
	}

	const data = await res.json();
	if (res.ok) {
		return data;
	}
	throw data.message;
}

export function post(link, body) {
	return genericFetch(link, 'POST', body);
}

export function patch(link, body = null) {
	return genericFetch(link, 'PATCH', body);
}

export function put(link, body = null) {
	return genericFetch(link, 'PUT', body);
}

export function get(link, searchParams = null) {
	const url = new URL(link);

	if (searchParams) {
		const httpParams = new URLSearchParams();
		Object.keys(searchParams).forEach((key) => {
			httpParams.append(key, searchParams[key]);
		});
		url.search = httpParams.toString();
	}

	return genericFetch(url.toString());
}

export function deleteEntity(link) {
	return genericFetch(link, 'DELETE');
}

export async function uploadImage(link, image) {
	const formData = new FormData();
	formData.append('file', image);
	const res = await fetch(link, {
		mode: 'cors',
		method: 'POST',
		body: formData
	});

	if (res.ok) {
		return { status: res.status };
	}
	throw ['photo could not be uploaded'];
}
