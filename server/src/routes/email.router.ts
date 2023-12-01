import { router } from '../trpc/index.js';
import { emailController } from '../modules/index.js';

const emailRouter = router({
	sendInvitationToEvent: emailController.sendInvitationToEvent,
	sendInvitationToEvents: emailController.sendInvitationToEvents,
	resendAllInvitationToEvents: emailController.resendAllInvitationToEvents
});

export default emailRouter;
