import { TErrorResponse } from '@/services';

const isTErrorResponse = (error: unknown): error is TErrorResponse => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		'message' in error &&
		'status' in error &&
		'zodError' in error
	);
};

export default isTErrorResponse;
