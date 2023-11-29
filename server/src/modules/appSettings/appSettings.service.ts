import { UserModel } from '../user/index.js';
import { ApiError } from '../../error/index.js';
import { AppSettingsModel } from './appSettings.model.js';
import { TAddAppSettingsDto } from './appSettings.types.js';

class AppSettingsService {
	async addAppSettings({ userId, ...restAppSettings }: TAddAppSettingsDto) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

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
}

export default new AppSettingsService();
