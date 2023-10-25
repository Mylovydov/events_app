import { router } from '../trpc/index.js';
import tokenRouter from './token.router.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import uploadRouter from './upload.router.js';

const appRouter = router({
	token: tokenRouter,
	auth: authRouter,
	users: userRouter,
	upload: uploadRouter
});

export default appRouter;
