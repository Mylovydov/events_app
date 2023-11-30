import { router } from '../trpc/index.js';
import { emailController } from '../modules/index.js';

const emailRouter = router({
	sendEmailInvitationToEvent: emailController.sendEmailInvitationToEvent
});

export default emailRouter;
