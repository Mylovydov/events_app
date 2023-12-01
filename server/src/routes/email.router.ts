import { router } from '../trpc/index.js';
import { emailController } from '../modules/index.js';

const emailRouter = router({
	sendInvitationToEvent: emailController.sendInvitationToEvent,
	sendInvitationToEvents: emailController.sendInvitationToEvents
});

export default emailRouter;
