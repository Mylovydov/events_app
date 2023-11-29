import { router } from '../trpc/index.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import eventsRouter from './events.router.js';
import tokenRouter from './token.router.js';
import emailTemplateRouter from './emailTemplate.router.js';
import emailSettingsRouter from './emailSettings.router.js';
import appSettingsRouter from './appSettings.router.js';

const appRouter = router({
	token: tokenRouter,
	auth: authRouter,
	users: userRouter,
	events: eventsRouter,
	emailTemplate: emailTemplateRouter,
	emailSettings: emailSettingsRouter,
	appSettings: appSettingsRouter
});

export default appRouter;
