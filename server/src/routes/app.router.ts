import { router } from '../trpc';
import authRouter from './auth.router';
import userRouter from './user.router';
import eventsRouter from './events.router';
import tokenRouter from './token.router';
import emailTemplateRouter from './emailTemplate.router';
import emailSettingsRouter from './emailSettings.router';
import appSettingsRouter from './appSettings.router';
import emailRouter from './email.router';

const appRouter = router({
	token: tokenRouter,
	auth: authRouter,
	users: userRouter,
	events: eventsRouter,
	emailTemplate: emailTemplateRouter,
	emailSettings: emailSettingsRouter,
	appSettings: appSettingsRouter,
	email: emailRouter
});

export default appRouter;
