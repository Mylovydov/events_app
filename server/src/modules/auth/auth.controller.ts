import { authService } from './index.js';
import authProcedures from './auth.procedures.js';

const authController = {
	register: authProcedures.register.mutation(async ({ input }) => {
		const tokens = await authService.register(input);
		return {
			message: 'User has been registered',
			data: tokens
		};
	}),

	login: authProcedures.login.mutation(async ({ input }) => {
		const tokens = await authService.login(input);
		return {
			message: 'Logged in successfully',
			data: {
				...tokens
			}
		};
	}),

	logout: authProcedures.logout.mutation(async ({ ctx }) => {
		await authService.logout(ctx.userId);
		return {
			message: 'Logged out successfully',
			data: {}
		};
	}),

	refresh: authProcedures.refresh.mutation(({ ctx: { req } }) => {
		const { cookies } = req;
		const refreshToken = cookies['refreshToken'];
		return authService.refresh(refreshToken);
	})
};

export default authController;
