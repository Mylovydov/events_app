import { router } from '../trpc';
import { appSettingsController } from '../modules';

const appSettingsRouter = router({
	addEmailSettings: appSettingsController.addEmailSettings,
	resetAppSettings: appSettingsController.resetAppSettings
});

export default appSettingsRouter;
