import { authService } from './index.js';
import authProcedures from './auth.procedures.js';
import {
	clearAuthCookie,
	getRefreshTokenFromCookie,
	setAuthCookie
} from '../../utils/index.js';

const authController = {
	register: authProcedures.register.mutation(async ({ input, ctx }) => {
		const tokens = await authService.register(input);
		setAuthCookie(ctx.res, tokens.refreshToken);

		return {
			message: 'User has been registered',
			data: tokens
		};
	}),

	login: authProcedures.login.mutation(async ({ input, ctx: { res } }) => {
		const tokens = await authService.login(input);
		setAuthCookie(res, tokens.refreshToken);

		return {
			message: 'Logged in successfully',
			data: {
				...tokens
			}
		};
	}),

	logout: authProcedures.logout.mutation(async ({ ctx }) => {
		await authService.logout(ctx.userId);
		clearAuthCookie(ctx.res);

		return {
			message: 'Logged out successfully',
			data: {}
		};
	}),

	refresh: authProcedures.refresh.mutation(async ({ ctx: { req } }) => {
		const refreshToken = getRefreshTokenFromCookie(req);
		const tokens = await authService.refresh(refreshToken);
		return {
			message: 'Tokens have been updated',
			data: tokens
		};
	})
};

export default authController;
