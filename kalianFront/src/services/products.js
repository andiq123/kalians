// import { GetProductsEndPoint } from './endpoints/api-endpoints';
// import { manyAlertsError } from './alerts';
// import { getReq, patch, post, uploadImage } from '$lib/api';

// export function GetProducts(searchParams = null, token = null) {
// 	try {
// 		console.log(token);
// 		return 'da';
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }

// export function ProductCreate(product) {
// 	try {
// 		return post(GetProductsEndPoint, product);
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }

// export function ProductUpdate(product) {
// 	try {
// 		product.category = undefined;
// 		return patch(`${GetProductsEndPoint}/${product.id}`, product);
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }

// export function UploadPhoto(id, image) {
// 	try {
// 		return uploadImage(`${GetProductsEndPoint}/file/${id}`, image);
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }

// export function Increment(id) {
// 	try {
// 		return get(`${GetProductsEndPoint}/increment/${id}`);
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }

// export function Decrement(id) {
// 	try {
// 		return get(`${GetProductsEndPoint}/decrement/${id}`);
// 	} catch (error) {
// 		manyAlertsError(error);
// 	}
// }
