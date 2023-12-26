import {
	clearAuthCookie,
	getRefreshTokenFromCookie,
	setAuthCookie
} from '../../utils';
import authService from './auth.service';
import authProcedures from './auth.procedures';
import { authInput, authOutput, logoutOutput } from './auth.dto';
import { z } from 'zod';

const authController = {
	register: authProcedures.register
		.input(authInput)
		.output(authOutput)
		.mutation(async ({ input, ctx }) => {
			const tokens = await authService.register(input);
			setAuthCookie(ctx.res, tokens.refreshToken);

			return {
				message: 'User has been registered!',
				data: tokens
			};
		}),

	login: authProcedures.login
		.input(authInput)
		.output(authOutput)
		.mutation(async ({ input, ctx: { res } }) => {
			const tokens = await authService.login(input);

			setAuthCookie(res, tokens.refreshToken);

			return {
				message: 'Logged in successfully!',
				data: {
					...tokens
				}
			};
		}),

	logout: authProcedures.logout
		.input(z.void())
		.output(logoutOutput)
		.mutation(async ({ ctx }) => {
			await authService.logout(ctx.userId);
			clearAuthCookie(ctx.res);

			return {
				message: 'Logged out successfully!',
				data: {}
			};
		}),

	refresh: authProcedures.refresh
		.input(z.void())
		.output(authOutput)
		.query(async ({ ctx: { req, res } }) => {
			const refreshToken = getRefreshTokenFromCookie(req);

			const tokens = await authService.refresh(refreshToken);
			setAuthCookie(res, tokens.refreshToken);

			return {
				message: 'Tokens have been updated!',
				data: tokens
			};
		})
};

export default authController;
