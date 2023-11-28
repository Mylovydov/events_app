import { router } from '../trpc/index.js';
import { emailSettingsController } from '../modules/emailSettings/index.js';

const emailSettingsRouter = router({
	addEmailSettings: emailSettingsController.addEmailSettings
});

export default emailSettingsRouter;
