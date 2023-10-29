import { authService } from './index.js';
import authProcedures from './auth.procedures.js';

const authController = {
	register: authProcedures.register.mutation(({ input }) => {
		return authService.register(input);
	}),

	login: authProcedures.login.mutation(({ input }) => {
		return authService.login(input);
	}),

	logout: authProcedures.logout.mutation(({ ctx }) => {
		return authService.logout(ctx.userId);
	}),

	refresh: authProcedures.refresh.mutation(({ ctx: { req } }) => {
		const { cookies } = req;
		const refreshToken = cookies['refreshToken'];
		return authService.refresh(refreshToken);
	})
};

export default authController;
