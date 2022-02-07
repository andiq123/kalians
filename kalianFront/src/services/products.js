import { GetProductsEndPoint } from '../endpoints/api-endpoints';
import { manyAlertsError } from './alerts';
import { get, patch, post, uploadImage } from './fetch';

export async function GetProducts(searchParams = null) {
	try {
		return await get(GetProductsEndPoint, searchParams);
	} catch (error) {
		manyAlertsError(error);
	}
}

export async function ProductCreate(product) {
	try {
		return await post(GetProductsEndPoint, product);
	} catch (error) {
		manyAlertsError(error);
	}
}

export async function ProductUpdate(product) {
	try {
		product.category = undefined;
		return patch(`${GetProductsEndPoint}/${product.id}`, product);
	} catch (error) {
		manyAlertsError(error);
	}
}

export async function UploadPhoto(id, image) {
	try {
		return await uploadImage(`${GetProductsEndPoint}/file/${id}`, image);
	} catch (error) {
		manyAlertsError(error);
	}
}

export async function Increment(id) {
	try {
		return await get(`${GetProductsEndPoint}/increment/${id}`);
	} catch (error) {
		manyAlertsError(error);
	}
}

export async function Decrement(id) {
	try {
		return await get(`${GetProductsEndPoint}/decrement/${id}`);
	} catch (error) {
		manyAlertsError(error);
	}
}
