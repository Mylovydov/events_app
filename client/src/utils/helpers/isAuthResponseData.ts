import { TAuthOutput } from '@/services';

const isAuthResponseData = (data: unknown): data is TAuthOutput =>
	typeof data === 'object' &&
	data !== null &&
	'accessToken' in data &&
	'refreshToken' in data;

export default isAuthResponseData;
