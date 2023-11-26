import { router } from '../trpc/index.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import eventsRouter from './events.router.js';
import tokenRouter from './token.router.js';
import emailTemplateRouter from './emailTemplate.router.js';
import emailRouter from './email.router.js';

const appRouter = router({
	token: tokenRouter,
	auth: authRouter,
	users: userRouter,
	events: eventsRouter,
	emailTemplate: emailTemplateRouter,
	email: emailRouter
});

export default appRouter;
