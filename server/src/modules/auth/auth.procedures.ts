import { authProcedure, publicProcedure } from '../../trpc/index.js';
import { authInput, authOutput, logoutOutput } from './auth.dto.js';
import { z } from 'zod';

const authProcedures = {
	register: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/register',
				tags: ['auth'],
				summary: 'Register user in the system',
				example: {
					request: {
						email: 'user@example.com',
						password: '12345678'
					}
				}
			}
		})
		.input(authInput)
		.output(authOutput),
	login: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/login',
				tags: ['auth'],
				summary: 'Login user to the system',
				example: {
					request: {
						email: 'user@example.com',
						password: '12345678'
					}
				}
			}
		})
		.input(authInput)
		.output(authOutput),
	logout: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/logout',
				tags: ['auth'],
				summary: 'Logout user from the system',
				protect: true
			}
		})
		.input(z.void())
		.output(logoutOutput),
	refresh: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/auth/refresh',
				tags: ['auth'],
				summary: 'Update token pair by refresh token',
				protect: true
			}
		})
		.input(z.void())
		.output(authOutput)
};

export default authProcedures;
