import { TCreateUserDto, TUpdateUserDto } from './user.types.js';
import { UserDocument } from './models/user.model.js';
import { ApiError } from '../../error/index.js';
import { TAddSmtpSettingsDto } from '../smtp-settings/smtp-settings.types.js';
import { SmtpSettingsModel, UserModel } from './models/index.js';

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
		).lean();

		if (!userToUpdate) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}
		return userToUpdate;
	}

	async delete(userId: string) {
		const deletedUser = await UserModel.findOneAndDelete({
			_id: userId
		}).lean();
		if (!deletedUser) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		return deletedUser;
	}

	async getAll() {
		return UserModel.find().lean();
	}

	async getByEmail(email: string): Promise<UserDocument | null> {
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

		let smtpSettings = await SmtpSettingsModel.findOneAndUpdate(
			{
				user: userId
			},
			{ ...restDto },
			{ new: true }
		);

		if (smtpSettings) {
			return smtpSettings.toJSON();
		}

		smtpSettings = await SmtpSettingsModel.create({ ...restDto, user: userId });
		user.smtpSettings = smtpSettings._id;
		await user.save();

		return smtpSettings.toJSON();
	}
}

export default new UserService();
