import {
	TAddAppSettingsDto,
	TAddEmailSettingsDto,
	TCreateUserDto,
	TUpdateUserDto
} from './user.types.js';
import { ApiError } from '../../error/index.js';
import { AppSettingsModel, UserModel } from './models/index.js';
import { tokenService } from '../token/index.js';
import {
	emailTemplateService,
	TAddEmailTemplateInput
} from '../emailTemplate/index.js';
import { EmailSettingsModel } from '../email/index.js';

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
			.populate('emailTemplate')
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
			.populate('emailTemplate')
			.lean();
		if (!deletedUser) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		if (deletedUser.emailSettings) {
			await EmailSettingsModel.deleteOne({ _id: deletedUser.emailSettings });
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
			.populate('emailTemplate')
			.lean();
	}

	async getByEmail(email: string) {
		return UserModel.findOne({ email });
	}

	async getById(id: string) {
		const user = await UserModel.findById(id)
			.populate('smtpSettings')
			.populate('appSettings')
			.populate('emailTemplate');
		if (!user) {
			throw ApiError.notFound(`User with id: ${id} not found!`);
		}
		return user.toJSON();
	}

	async getByIdWithoutFlatten(id: string) {
		return UserModel.findById(id);
	}

	async addEmailSettings({
		userId,
		...restEmailSettings
	}: TAddEmailSettingsDto) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		const emailSettingsDb = await EmailSettingsModel.findByIdAndUpdate(
			user.emailSettings,
			{ ...restEmailSettings },
			{ new: true }
		);

		if (!emailSettingsDb) {
			const createdEmailSettings = await EmailSettingsModel.create({
				...restEmailSettings
			});
			user.appSettings = createdEmailSettings._id;
			await user.save();
		}

		const updatedUser = await UserModel.findById(user._id)
			.populate('smtpSettings')
			.populate('emailTemplate')
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

		return await this.getById(user._id);
	}

	async addEmailTemplateByUserId(input: TAddEmailTemplateInput) {
		await emailTemplateService.addEmailTemplate(input);
		return await this.getById(input.userId);
	}
}

export default new UserService();
