import {
	TAddAppSettingsDto,
	TAddSmtpSettingsDto,
	TCreateUserDto,
	TUpdateUserDto
} from './user.types.js';
import { ApiError } from '../../error/index.js';
import {
	AppSettingsModel,
	SmtpSettingsModel,
	UserModel
} from './models/index.js';
import { tokenService } from '../token/index.js';

class UserService {
	async create(dto: TCreateUserDto) {
		const candidate = await this.getByEmail(dto.email);
		if (candidate) {
			throw ApiError.badRequest('User already exists!');
		}
		const user = await UserModel.create(dto);
		await this.addAppSettings({ userId: user._id, isAutoSendEnabled: false });
		return user.toJSON();
	}

	async update(dto: TUpdateUserDto) {
		const { userId, ...rest } = dto;

		const userToUpdate = await UserModel.findByIdAndUpdate(
			{ _id: userId },
			{ ...rest },
			{ new: true }
		)
			.populate('smtpSettings')
			.populate('appSettings')
			.lean();

		if (!userToUpdate) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}
		return userToUpdate;
	}

	async delete(userId: string) {
		const deletedUser = await UserModel.findOneAndDelete({
			_id: userId
		})
			.populate('smtpSettings')
			.populate('appSettings')
			.lean();
		if (!deletedUser) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		if (deletedUser.smtpSettings) {
			await SmtpSettingsModel.deleteOne({ _id: deletedUser.smtpSettings });
		}

		if (deletedUser.appSettings) {
			await AppSettingsModel.deleteOne({ _id: deletedUser.appSettings });
		}

		await tokenService.deleteRefreshToken(deletedUser._id);
		return deletedUser;
	}

	async getAll() {
		return UserModel.find()
			.populate('smtpSettings')
			.populate('appSettings')
			.lean();
	}

	async getByEmail(email: string) {
		return UserModel.findOne({ email });
	}

	async getById(id: string) {
		const user = await UserModel.findOne({ _id: id })
			.populate('smtpSettings')
			.populate('appSettings');
		if (!user) {
			throw ApiError.notFound(`User with id: ${id} not found!`);
		}

		return user.toJSON();
	}

	async addSmtpSettings({ userId, ...restSmtpSettings }: TAddSmtpSettingsDto) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		const smtpSettingsDb = await SmtpSettingsModel.findByIdAndUpdate(
			user.smtpSettings,
			{ ...restSmtpSettings },
			{ new: true }
		);

		if (!smtpSettingsDb) {
			const createdSmtpSettings = await SmtpSettingsModel.create({
				...restSmtpSettings
			});
			user.appSettings = createdSmtpSettings._id;
			await user.save();
		}

		const updatedUser = await UserModel.findById(user._id)
			.populate('smtpSettings')
			.populate('appSettings');

		return updatedUser!.toJSON();
	}

	async addAppSettings({ userId, ...restAppSettings }: TAddAppSettingsDto) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		const appSettingsDb = await AppSettingsModel.findByIdAndUpdate(
			user.appSettings,
			{ ...restAppSettings },
			{ new: true }
		);

		if (!appSettingsDb) {
			const createdAppSettings = await AppSettingsModel.create({
				...restAppSettings
			});
			user.appSettings = createdAppSettings._id;
			await user.save();
		}

		const updatedUser = await UserModel.findById(user._id)
			.populate('smtpSettings')
			.populate('appSettings');

		return updatedUser!.toJSON();
	}
}

export default new UserService();
