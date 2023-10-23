import { authProcedure, publicProcedure } from '../../trpc/index.js';
import {
	authInput,
	authOutput,
	logoutInput,
	logoutOutput
} from './auth.dto.js';
import { authService } from './index.js';
import { z } from 'zod';

const authController = {
	register: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/register',
				tags: ['auth'],
				summary: 'Register user in the system'
			}
		})
		.input(authInput)
		.output(authOutput)
		.mutation(({ input }) => {
			return authService.register(input);
		}),

	login: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/login',
				tags: ['auth'],
				summary: 'Login user to the system'
			}
		})
		.input(authInput)
		.output(authOutput)
		.mutation(({ input }) => {
			return authService.login(input);
		}),

	logout: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/logout',
				tags: ['auth'],
				summary: 'Logout user from the system'
			}
		})
		.input(logoutInput)
		.output(logoutOutput)
		.mutation(({ ctx }) => {
			return authService.logout(ctx.userId);
		}),

	refresh: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/check',
				tags: ['auth'],
				summary: 'Update token pair by refresh token'
			}
		})
		.input(logoutInput)
		.output(z.void())
		.mutation(({ ctx: { req } }) => {
			const { cookies } = req;
			const refreshToken = cookies['refreshToken'];
			return authService.refresh(refreshToken);
		})
};

export default authController;
