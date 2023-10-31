import jwt from 'jsonwebtoken';
import { TGenerateResult, TPayload, TToken } from './token.types.js';
import { TokenModel } from './token.model.js';

class TokenService {
	private accessTokenKey = process.env.ACCESS_JWT_SECRET || 'secret-access-key';
	private refreshTokenKey =
		process.env.REFRESH_JWT_SECRET || 'secret-refresh-key';

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
		await TokenModel.create({ refreshToken, userId });
	}
}

export default new TokenService();
