import { publicProcedure, router } from '../trpc/index.js';
import { z } from 'zod';
import { OpenApiRouter } from 'trpc-openapi/dist/types.js';

const appRouter: OpenApiRouter = router({
	healthCheck: publicProcedure
		.meta({ openapi: { method: 'GET', path: '/health-check' } })
		.input(z.void())
		.output(z.object({ health: z.string() }))
		.query(() => {
			return {
				health: 'OK'
			};
		})
});

export type TAppRouter = typeof appRouter;

export default appRouter;
