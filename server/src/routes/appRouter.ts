import { publicProcedure, router } from '../trpc/index.js';
import { z } from 'zod';
import { OpenApiRouter } from 'trpc-openapi/dist/types.js';
import { UserModel } from '../modules/user/user.model.js';

const appRouter: OpenApiRouter = router({
	healthCheck: publicProcedure
		.meta({ openapi: { method: 'GET', path: '/health-check' } })
		.input(z.void())
		.output(z.object({ health: z.string() }))
		.query(() => {
			return {
				health: 'OK'
			};
		}),
	test: publicProcedure
		.meta({ openapi: { method: 'GET', path: '/test' } })
		.input(z.void())
		.output(
			z.object({
				user: z.object({
					id: z.string(),
					email: z.string(),
					password: z.string()
				})
			})
		)
		.query(async () => {
			const user = await UserModel.create({
				email: 'test@email',
				password: '123'
			});

			return {
				user: {
					id: user.id,
					email: user.email,
					password: user.password
				}
			};
		})
});

export type TAppRouter = typeof appRouter;

export default appRouter;
