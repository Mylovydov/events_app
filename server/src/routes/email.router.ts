import { router } from '../trpc';
import { emailController } from '../modules';

const emailRouter = router({
	sendInvitationToEvent: emailController.sendInvitationToEvent,
	sendInvitationToEvents: emailController.sendInvitationToEvents,
	resendAllInvitationToEvents: emailController.resendAllInvitationToEvents
});

export default emailRouter;
