import { authProcedure, publicProcedure } from '../../trpc';
import { z } from 'zod';
import { authInput, authOutput, logoutOutput } from './auth.dto';
import { authResponseExample } from '../../utils';

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
					},
					response: {
						message: 'User has been registered!',
						data: authResponseExample
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
					},
					response: {
						message: 'Logged in successfully!',
						data: authResponseExample
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
				protect: true,
				example: {
					request: {},
					response: {
						message: 'Logged out successfully!',
						data: {}
					}
				}
			}
		})
		.input(z.void())
		.output(logoutOutput),
	refresh: publicProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/auth/refresh',
				tags: ['auth'],
				summary: 'Update token pair by refresh token',
				protect: true,
				example: {
					request: {},
					response: {
						message: 'Tokens have been updated!',
						data: authResponseExample
					}
				}
			}
		})
		.input(z.void())
		.output(authOutput)
};

export default authProcedures;
