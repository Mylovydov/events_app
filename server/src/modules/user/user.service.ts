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
import { TokenModel } from '../token/index.js';

class UserService {
	async create(dto: TCreateUserDto) {
		const candidate = await this.getByEmail(dto.email);
		if (candidate) {
			throw ApiError.badRequest('User already exists!');
		}
		const user = await UserModel.create(dto);
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
			.lean();
		if (!deletedUser) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		if (deletedUser.smtpSettings) {
			await SmtpSettingsModel.deleteOne({ _id: deletedUser.smtpSettings });
		}

		await TokenModel.deleteOne({ userId: deletedUser._id });
		return deletedUser;
	}

	async getAll() {
		return UserModel.find().populate('smtpSettings').lean();
	}

	async getByEmail(email: string) {
		return UserModel.findOne({ email });
	}

	async getById(id: string) {
		const user = await UserModel.findOne({ _id: id }).populate('smtpSettings');
		if (!user) {
			throw ApiError.notFound(`User with id: ${id} not found!`);
		}

		return user.toJSON();
	}

	async addSmtpSettings({ userId, ...restDto }: TAddSmtpSettingsDto) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		let smtpSettings = await SmtpSettingsModel.findByIdAndUpdate(
			user.smtpSettings,
			{ ...restDto },
			{ new: true }
		);

		if (smtpSettings) {
			return smtpSettings.toJSON();
		}

		smtpSettings = await SmtpSettingsModel.create({ ...restDto });
		user.smtpSettings = smtpSettings._id;
		await user.save();

		return smtpSettings.toJSON();
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

		const updatedUser = await UserModel.findById(user._id).populate(
			'appSettings'
		);

		return updatedUser!.toJSON();
	}
}

export default new UserService();
