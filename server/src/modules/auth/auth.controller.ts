import { publicProcedure } from '../../trpc/index.js';
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
				summary: 'Register as a new user'
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
				summary: 'Register as a new user'
			}
		})
		.input(authInput)
		.output(authOutput)
		.mutation(({ input }) => {
			return authService.login(input);
		}),

	logout: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/logout',
				tags: ['auth'],
				summary: 'Register as a new user'
			}
		})
		.input(logoutInput)
		.output(logoutOutput)
		.mutation(({ ctx }) => {
			return authService.logout(ctx.userId);
		}),

	check: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/check',
				tags: ['auth'],
				summary: ''
			}
		})
		.input(logoutInput)
		.output(z.void())
		.mutation(({ ctx: { req } }) => {
			const { cookies } = req;
			const refreshToken = cookies['refreshToken'];
			return authService.check(refreshToken);
		})
};

export default authController;
