import { router } from '../trpc';
import { emailSettingsController } from '../modules/emailSettings';

const emailSettingsRouter = router({
	addEmailSettings: emailSettingsController.addEmailSettings,
	resetEmailSettings: emailSettingsController.resetEmailSettings,
	getEmailSettingsById: emailSettingsController.getEmailSettingsById
});

export default emailSettingsRouter;
