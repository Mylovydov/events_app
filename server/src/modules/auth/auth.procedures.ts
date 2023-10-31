import { authProcedure, publicProcedure } from '../../trpc/index.js';
import {
	authInput,
	authOutput,
	logoutInput,
	logoutOutput,
	refreshOutput
} from './auth.dto.js';

const authProcedures = {
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
		.output(authOutput),
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
		.input(logoutInput)
		.output(logoutOutput),
	refresh: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/auth/check',
				tags: ['auth'],
				summary: 'Update token pair by refresh token',
				protect: true
			}
		})
		.input(logoutInput)
		.output(refreshOutput)
};

export default authProcedures;
