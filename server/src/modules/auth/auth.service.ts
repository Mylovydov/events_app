import { UserModel, userService } from '../user';
import { ApiError } from '../../error';
import bcrypt from 'bcrypt';
import { tokenService } from '../token';
import { TAuthDto } from './auth.types';
import { TToken } from '../token/token.types';

class AuthService {
	private userService = userService;
	async register(dto: TAuthDto) {
		const { password, ...rest } = dto;

		const candidate = await this.userService.getByEmail(rest.email);
		if (candidate) {
			throw ApiError.badRequest('User already exists!');
		}

		const hashPassword = bcrypt.hashSync(password, 3);

		const newUser = await this.userService.create({
			...rest,
			password: hashPassword
		});
		return await tokenService.generateTokens({ userId: newUser._id });
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
			throw ApiError.unauthorized('Wrong password!');
		}

		return await tokenService.generateTokens({ userId: user.id });
	}

	async logout(userId: string | null) {
		if (!userId) {
			throw ApiError.unauthorized('User id is missing');
		}

		await tokenService.deleteRefreshToken(userId);
	}

	async refresh(token?: TToken) {
		if (!token) {
			throw ApiError.unauthorized('Refresh token is missing');
		}

		const dbRefreshToken = await tokenService.getRefreshToken(token);
		if (!dbRefreshToken) {
			throw ApiError.unauthorized('Invalid refresh token');
		}

		const userId = tokenService.verifyRefreshToken(token);
		if (!userId) {
			throw ApiError.unauthorized('Invalid refresh token');
		}

		return await tokenService.generateTokens({ userId });
	}
}

export default new AuthService();
