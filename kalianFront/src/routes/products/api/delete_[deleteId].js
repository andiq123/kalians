import { deleteReq } from '$lib/api';
import { GetProductsEndPoint } from '$lib/api-endpoints';

export const get = ({ locals, params: { deleteId } }) => {
	const token = locals['token'];
	return deleteReq(`${GetProductsEndPoint}/${deleteId}`, token);
};
