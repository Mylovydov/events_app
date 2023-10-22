import { TRPCError } from '@trpc/server';
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';

class ApiError extends TRPCError {
	constructor(code: TRPC_ERROR_CODE_KEY, message?: string, cause?: unknown) {
		super({ message, code, cause });
	}

	static badRequest(message: string, cause?: unknown) {
		return new ApiError('BAD_REQUEST', message, cause);
	}

	static internal(message: string, cause?: unknown) {
		return new ApiError('INTERNAL_SERVER_ERROR', message, cause);
	}

	static forbidden(message: string, cause?: unknown) {
		return new ApiError('FORBIDDEN', message, cause);
	}

	static unauthorized(message: string, cause?: unknown) {
		return new ApiError('UNAUTHORIZED', message, cause);
	}

	static notFound(message: string, cause?: unknown) {
		return new ApiError('NOT_FOUND', message, cause);
	}
}

export default ApiError;
