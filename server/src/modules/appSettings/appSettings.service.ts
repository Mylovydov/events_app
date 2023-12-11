import { ApiError } from '../../error';
import { TAddAppSettingsDto, TResetAppSettingsDto } from './appSettings.types';
import { AppSettingsModel } from './appSettings.model';
import { userService } from '../user';
import { defaultAppSettings } from '../../utils';

class AppSettingsService {
	async addAppSettings({ userId, ...restAppSettings }: TAddAppSettingsDto) {
		const user = await userService.getByIdWithoutFlatten(userId);

		let appSettingsDb = await AppSettingsModel.findByIdAndUpdate(
			user.appSettings,
			{ ...restAppSettings },
			{ new: true }
		);

		if (!appSettingsDb) {
			appSettingsDb = await AppSettingsModel.create({
				...restAppSettings
			});
			user.appSettings = appSettingsDb._id;
			await user.save();
		}
		return appSettingsDb.toJSON();
	}

	async resetAppSettings({ userId }: TResetAppSettingsDto) {
		const user = await userService.getByIdWithoutFlatten(userId);

		const appSettingsDb = await this.setDefaultAppSettings(
			user.appSettings as string
		);

		return appSettingsDb.toJSON();
	}

	private async setDefaultAppSettings(appSettingsId: string) {
		const appSettingsDb = await AppSettingsModel.findByIdAndUpdate(
			appSettingsId,
			defaultAppSettings,
			{ new: true }
		);

		if (!appSettingsDb) {
			throw ApiError.notFound(
				`App settings with id: ${appSettingsId} not found!`
			);
		}

		return appSettingsDb;
	}
}

export default new AppSettingsService();
