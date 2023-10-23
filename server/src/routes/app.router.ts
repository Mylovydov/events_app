import { router } from '../trpc/index.js';
import { tokenRouter } from './token.router.js';
import { authRouter } from './auth.router.js';
import { userRouter } from './user.router.js';

const appRouter = router({
	token: tokenRouter,
	auth: authRouter,
	users: userRouter
});

export default appRouter;
