import { middleware } from '../trpc/index.js';
import { ApiError } from '../error/index.js';

const isAuthMiddleware = middleware(({ ctx, next }) => {
	if (!ctx.userId) {
		throw ApiError.unauthorized('Access denied');
	}

	return next();
});

export default isAuthMiddleware;
