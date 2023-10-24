import { TCreateUserDto, TUpdateUserDto } from './user.types.js';
import { UserDocument, UserModel } from './user.model.js';
import { ApiError } from '../../error/index.js';

class UserService {
	async create(dto: TCreateUserDto) {
		const candidate = await this.getByEmail(dto.email);
		if (candidate) {
			throw ApiError.badRequest('User already exists!');
		}
		return await UserModel.create(dto);
	}

	async update(dto: TUpdateUserDto) {
		const { userId, ...rest } = dto;

		const userToUpdate = await UserModel.findByIdAndUpdate(
			{ _id: userId },
			rest,
			{ new: true }
		);
		if (!userToUpdate) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}
		return userToUpdate;
	}

	async delete(userId: string) {
		const userToDelete = await UserModel.findOneAndDelete({ _id: userId });
		if (!userToDelete) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}
	}

	async getByEmail(email: string): Promise<UserDocument | null> {
		return UserModel.findOne({ email });
	}

	async getById(id: string): Promise<UserDocument> {
		const user = await UserModel.findOne({ _id: id });
		if (!user) {
			throw ApiError.notFound(`User with id: ${id} not found!`);
		}
		return user;
	}
}

export default new UserService();
