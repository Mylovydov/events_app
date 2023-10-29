import { UserDocument, UserModel, userService } from '../user/index.js';
import { ApiError } from '../../error/index.js';
import bcrypt from 'bcrypt';
import { tokenService } from '../token/index.js';
import { TAuthDto } from './auth.types.js';
import { TToken } from '../token/token.types.js';

class AuthService {
	private userService = userService;
	async register(dto: TAuthDto) {
		const { password, ...rest } = dto;

		const candidate = await this.userService.getByEmail(rest.email);
		if (candidate) {
			throw ApiError.badRequest('User already exists!');
		}

		const hashPassword = bcrypt.hashSync(password, 3);

		const newUser: UserDocument = await this.userService.create({
			...rest,
			password: hashPassword
		});
		const tokens = await tokenService.generateTokens({ userId: newUser.id });

		return {
			message: 'User has been registered',
			data: {
				...tokens
			}
		};
	}

	async login(dto: TAuthDto) {
		const { email, password } = dto;

		const user = await UserModel.findOne({ email });
		if (!user) {
			throw ApiError.badRequest(
				`The user with the e-mail address ${email} does not exist.`
			);
		}

		const verifiedPassword = await bcrypt.compare(password, user.password);
		if (!verifiedPassword) {
			throw ApiError.badRequest(
				'Wrong password. Please try again or use the "Forgot password?" link to reset your password.'
			);
		}

		const tokens = await tokenService.generateTokens({ userId: user.id });

		return {
			message: 'Logged in successfully',
			data: {
				...tokens
			}
		};
	}

	async logout(userId: string | null) {
		if (!userId) {
			throw ApiError.badRequest('User not found');
		}

		await tokenService.deleteRefreshToken(userId);

		return {
			message: 'Logged out successfully',
			data: {}
		};
	}

	async refresh(token?: TToken) {
		if (!token) {
			throw ApiError.unauthorized('Refresh token is missing');
		}

		const dbRefreshToken = await tokenService.getRefreshToken(token);
		if (!dbRefreshToken) {
			throw ApiError.unauthorized('Invalid refresh token');
		}
		// TODO: need finish this method
	}
}

export default new AuthService();
