import { publicProcedure } from '../../trpc/index.js';
import {
	createUserInput,
	userIdInput,
	updateUserInput,
	userSchema
} from './user.dto.js';
import { z } from 'zod';

export const createUserProcedure = publicProcedure
	.meta({
		openapi: {
			method: 'POST',
			path: '/users',
			tags: ['users'],
			summary: 'Create a new user',
			example: {
				request: {
					name: 'John Doe',
					email: 'example@gmail.com',
					password: '12345678'
				},
				response: {
					id: '60f0f1b0c9e9b1b3e8f9b3b3',
					name: 'John Doe',
					email: 'example@gmail.com'
				}
			}
		}
	})
	.input(createUserInput)
	.output(userSchema);

export const getUserProcedure = publicProcedure
	.meta({
		openapi: {
			method: 'GET',
			path: '/users',
			tags: ['users'],
			summary: 'Get a user by id',
			example: {
				response: {
					id: 'b24f24af-d5cc-4ccd-ad33-1fc56bd6aeeb',
					name: 'John Doe',
					email: 'example@gmail.com'
				},
				request: {
					userId: 'b24f24af-d5cc-4ccd-ad33-1fc56bd6aeeb'
				}
			}
		}
	})
	.input(userIdInput)
	.output(userSchema);

export const updateUserProcedure = publicProcedure
	.meta({
		openapi: {
			method: 'PUT',
			path: '/users',
			tags: ['users'],
			summary: 'Update a user by id',
			example: {
				response: {
					id: '60f0f1b0c9e9b1b3e8f9b3b3',
					name: 'John',
					email: 'example@gmail.com'
				},
				request: {
					userId: '60f0f1b0c9e9b1b3e8f9b3b3',
					name: 'John',
					email: 'example@gmail.com'
				}
			}
		}
	})
	.input(updateUserInput)
	.output(userSchema);

export const deleteUserProcedure = publicProcedure
	.meta({
		openapi: {
			method: 'DELETE',
			path: '/users',
			tags: ['users'],
			summary: 'Delete user by id',
			example: {
				response: {},
				request: {
					userId: '60f0f1b0c9e9b1b3e8f9b3b3'
				}
			}
		}
	})
	.input(userIdInput)
	.output(z.void());
