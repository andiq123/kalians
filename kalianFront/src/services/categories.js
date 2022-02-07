import { GetCategoriesEndPoint } from './endpoints/api-endpoints';
import { manyAlertsError } from './alerts';
import { deleteEntity, get, post } from './generic-fetch';

export function CategoriesGet() {
	try {
		return get(GetCategoriesEndPoint);
	} catch (error) {
		manyAlertsError(error);
	}
}

export function CreateCategory(name) {
	try {
		return post(GetCategoriesEndPoint, { name });
	} catch (error) {
		manyAlertsError(error);
	}
}

export async function DeleteCategory(id) {
	try {
		await deleteEntity(GetCategoriesEndPoint + '/' + id);
	} catch (error) {
		manyAlertsError(error);
	}
}
