const BaseUrl = import.meta.env.VITE_BASE_URL;

export const GetCategoriesEndPoint = `${BaseUrl}categories`;
export const GetProductsEndPoint = `${BaseUrl}products`;
export const GetCartsEndPoint = `${BaseUrl}carts`;
export const PostLoginEndPoint = `${BaseUrl}auth/login`;
export const GetCheckToken = `${BaseUrl}auth/check`;
