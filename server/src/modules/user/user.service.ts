import {
	TCreateUserDto,
	TMainUserSchema,
	TUpdateUserDto
} from './user.types.js';
import { UserDocument, UserModel } from './user.model.js';
import { ApiError } from '../../error/index.js';

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
			rest,
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
		const user = await UserModel.findOne({ _id: id });

		if (!user) {
			throw ApiError.notFound(`User with id: ${id} not found!`);
		}

		return this.prepareUser(user.toJSON());
	}

	private prepareUser(user: TMainUserSchema) {
		return {
			_id: user._id,
			name: user.name,
			email: user.email
		};
	}
}

export default new UserService();
