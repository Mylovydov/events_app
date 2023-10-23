import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { TContext } from './context.js';
import { ZodError } from 'zod';
import { ApiError } from '../error/index.js';

export const t = initTRPC
	.context<TContext>()
	.meta<OpenApiMeta>()
	.create({
		errorFormatter(opts) {
			const { shape, error } = opts;

			return {
				...shape,
				data: {
					...shape.data,
					zodError:
						error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
							? error.cause.flatten()
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
	throw ApiError.forbidden('Access denied');
});

export const publicProcedure = t.procedure;
export const authProcedure = publicProcedure.use(isAuthMiddleware);
