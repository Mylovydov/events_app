import { authService } from './index.js';
import authProcedures from './auth.procedures.js';
import {
	clearAuthCookie,
	getRefreshTokenFromCookie,
	setAuthCookie
} from '../../utils/helpers/index.js';

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
		console.log('tokens', tokens);
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

	refresh: authProcedures.refresh.query(async ({ ctx: { req, res } }) => {
		const refreshToken = getRefreshTokenFromCookie(req);

		const tokens = await authService.refresh(refreshToken);
		setAuthCookie(res, tokens.refreshToken);
		console.log('refresh====================', tokens);
		return {
			message: 'Tokens have been updated',
			data: tokens
		};
	})
};

export default authController;

//acc
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDBiMGUwYS0wZjIzLTRhMzUtOGQwYS1lM2RmOGNhOTdlNTQiLCJpYXQiOjE3MDE3MTg0ODQsImV4cCI6MTcwMTcxODQ5NH0.NMS4qYvLfCwSO71zjRrDEI0X_lqL9qcfZeCWjRBWC6U

// refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDBiMGUwYS0wZjIzLTRhMzUtOGQwYS1lM2RmOGNhOTdlNTQiLCJpYXQiOjE3MDE3MTg0ODQsImV4cCI6MTcwMTc1NDQ4NH0.rhMrh5nUdrDbTYKTUTxGkzWCxhVC_vjWPWcHwfh3dic

//new refresh
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDBiMGUwYS0wZjIzLTRhMzUtOGQwYS1lM2RmOGNhOTdlNTQiLCJpYXQiOjE3MDE3MTg4MDQsImV4cCI6MTcwMTc1NDgwNH0.U8XuDkSITcWmVuI2Yvg8wnaFTZI0D2lzDfqZlpHefHc
