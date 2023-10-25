import { router } from '../trpc/index.js';
import { default as tokenRouter } from './token.router.js';
import { default as authRouter } from './auth.router.js';
import { default as userRouter } from './user.router.js';

const appRouter = router({
	token: tokenRouter,
	auth: authRouter,
	users: userRouter
});

export default appRouter;
