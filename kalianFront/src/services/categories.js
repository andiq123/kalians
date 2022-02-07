import { GetCategoriesEndPoint } from '../endpoints/api-endpoints';
import { manyAlertsError } from './alerts';
import { deleteEntity, get, post } from './fetch';

export async function CategoriesGet() {
	try {
		return await get(GetCategoriesEndPoint);
	} catch (error) {
		manyAlertsError(error.message);
	}
}

export async function CreateCategory(name) {
	try {
		return await post(GetCategoriesEndPoint, { name });
	} catch (error) {
		manyAlertsError(error.message);
	}
}

export async function DeleteCategory(id) {
	try {
		await deleteEntity(GetCategoriesEndPoint + '/' + id);
	} catch (error) {
		console.log(error);
		manyAlertsError(error.message);
	}
}
