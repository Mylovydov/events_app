import jwt from 'jsonwebtoken';
import { TGenerateResult, TPayload, TToken } from './token.types.js';
import { TokenModel } from './token.model.js';
import { config } from '../../config/index.js';

class TokenService {
	private accessTokenKey = config.get('ACCESS_JWT_SECRET');
	private refreshTokenKey = config.get('REFRESH_JWT_SECRET');

	async generateTokens(payload: TPayload): Promise<TGenerateResult> {
		const accessExpiresIn = '10h';
		const refreshExpiresIn = '10h';

		const accessToken = jwt.sign(payload, this.accessTokenKey, {
			expiresIn: accessExpiresIn
		});

		const refreshToken = jwt.sign(payload, this.refreshTokenKey, {
			expiresIn: refreshExpiresIn
		});

		await this.saveRefreshToken(payload.userId, refreshToken);

		return {
			accessToken,
			refreshToken
		};
	}

	verifyAccessToken(token: TToken) {
		try {
			const { userId } = <jwt.JwtPayload>jwt.verify(token, this.accessTokenKey);
			return userId;
		} catch {
			return null;
		}
	}

	verifyRefreshToken(token: TToken) {
		try {
			const { userId } = <jwt.JwtPayload>(
				jwt.verify(token, this.refreshTokenKey)
			);
			return userId;
		} catch {
			return null;
		}
	}

	async deleteRefreshToken(userId: string) {
		return TokenModel.deleteOne({ userId });
	}

	async getRefreshToken(token: string) {
		return TokenModel.findOne({ refreshToken: token });
	}

	private async saveRefreshToken(userId: string, refreshToken: TToken) {
		const token = await TokenModel.findOne({ userId });
		if (token) {
			token.refreshToken = refreshToken;
			return token.save();
		}
		await TokenModel.create({ refreshToken, userId });
	}
}

export default new TokenService();
