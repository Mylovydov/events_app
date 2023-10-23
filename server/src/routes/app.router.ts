import { publicProcedure, router } from '../trpc/index.js';
import { z } from 'zod';
import { OpenApiRouter } from 'trpc-openapi/dist/types.js';
import { tokenRouter } from './token.router.js';
import { authRouter } from './auth.router.js';

const appRouter: OpenApiRouter = router({
	token: tokenRouter,
	auth: authRouter
});

export type TAppRouter = typeof appRouter;

export default appRouter;
