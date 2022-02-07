export async function post(link, body) {
	const res = await fetch(link, {
		mode: 'cors',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	const data = await res.json();

	if (res.ok) {
		return data;
	}
	console.log(res);
	throw data.message;
}

export async function patch(link, body) {
	const res = await fetch(link, {
		mode: 'cors',
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	const data = await res.json();
	if (res.ok) {
		return data;
	}
	throw data.message;
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

export async function get(link, searchParams = null) {
	const url = new URL(link);

	if (searchParams) {
		const httpParams = new URLSearchParams();
		Object.keys(searchParams).forEach((key) => {
			httpParams.append(key, searchParams[key]);
		});
		url.search = httpParams.toString();
	}

	const res = await fetch(url.toString(), {
		mode: 'cors',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await res.json();
	if (res.ok) {
		return data;
	}
	throw data;
}

export async function deleteEntity(link) {
	const res = await fetch(link, {
		mode: 'cors',
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) {
		throw await res.json();
	}
}
