import { router } from '../trpc/index.js';
import { emailSettingsController } from '../modules/emailSettings/index.js';

const emailSettingsRouter = router({
	addEmailSettings: emailSettingsController.addEmailSettings,
	resetEmailSettings: emailSettingsController.resetEmailSettings,
	getEmailSettingsById: emailSettingsController.getEmailSettingsById
});

export default emailSettingsRouter;
