import { manyAlertsError } from './alerts';
import { GetCartsEndPoint } from './endpoints/api-endpoints';
import { get, put } from './generic-fetch';

export async function CartsGet() {
	try {
		return await get(GetCartsEndPoint);
	} catch (error) {
		manyAlertsError(error);
	}
}

export async function CompleteCart(id) {
	try {
		return await put(GetCartsEndPoint + '/' + id);
	} catch (error) {
		manyAlertsError(error);
	}
}
