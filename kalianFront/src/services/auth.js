import { PostLoginEndPoint } from '../lib/api-endpoints
import { genericFetch } from '$lib/api';

export const login = (creds) => {
	return genericFetch({ link: PostLoginEndPoint, method: 'POST', data: creds });
};
