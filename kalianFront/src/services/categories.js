// import { GetCategoriesEndPoint } from './endpoints/api-endpoints';
// import { manyAlertsError } from './alerts';
// import { deleteEntity, get, post } from '$lib/api';

// export function CategoriesGet() {
// 	try {
// 		return get(GetCategoriesEndPoint);
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }

// export function CreateCategory(name) {
// 	try {
// 		return post(GetCategoriesEndPoint, { name });
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }

// export function DeleteCategory(id) {
// 	try {
// 		return deleteEntity(GetCategoriesEndPoint + '/' + id);
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }
