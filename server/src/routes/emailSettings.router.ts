import { router } from '../trpc/index.js';
import { emailSettingsController } from '../modules/emailSettings/index.js';

const emailSettingsRouter = router({
	addEmailSettings: emailSettingsController.addEmailSettings,
	sendInvitationToEvent: emailSettingsController.sendInvitationToEvent,
	resetEmailSettings: emailSettingsController.resetEmailSettings
});

export default emailSettingsRouter;
