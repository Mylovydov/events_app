import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { TContext } from './context';
import { ApiError } from '../error';
import { ZodError } from 'zod';
import { prepareFlattenZodError } from '../utils/helpers';

export const t = initTRPC
	.context<TContext>()
	.meta<OpenApiMeta>()
	.create({
		errorFormatter(opts) {
			const { shape, error } = opts;

			return {
				...shape,
				data: {
					code: shape.data.code,
					status: shape.data.httpStatus,
					message: shape.message,
					zodError:
						error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
							? prepareFlattenZodError(error.cause.flatten())
							: null
				}
			};
		}
	});

export const router = t.router;
export const middleware = t.middleware;

const isAuthMiddleware = middleware(({ ctx, next }) => {
	if (ctx.userId) {
		return next();
	}
	throw ApiError.unauthorized('Access denied');
});

export const publicProcedure = t.procedure;
export const authProcedure = publicProcedure.use(isAuthMiddleware);
