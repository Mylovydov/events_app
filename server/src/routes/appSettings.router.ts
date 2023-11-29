import { router } from '../trpc/index.js';
import { appSettingsController } from '../modules/index.js';

const appSettingsRouter = router({
	addEmailSettings: appSettingsController.addEmailSettings,
	resetAppSettings: appSettingsController.resetAppSettings
});

export default appSettingsRouter;
