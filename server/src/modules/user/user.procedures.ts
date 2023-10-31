import { authProcedure } from '../../trpc/index.js';
import {
	createUserInput,
	createUserOutput,
	deleteUserOutput,
	getUserOutput,
	getUsersOutput,
	updateUserInput,
	updateUserOutput,
	userIdInput
} from './user.dto.js';
import { z } from 'zod';

const userProcedures = {
	create: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/users',
				tags: ['users'],
				summary: 'Create a new user',
				protect: true,
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
		.output(createUserOutput),

	getUser: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/users/{userId}',
				tags: ['users'],
				protect: true,
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
		.output(getUserOutput),

	getUsers: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/users',
				tags: ['users'],
				protect: true,
				summary: 'Get all users',
				example: {
					response: {
						message: '',
						data: [
							{
								id: 'b24f24af-d5cc-4ccd-ad33-1fc56bd6aeeb',
								name: 'John Doe',
								email: 'example@gmail.com'
							},
							{
								id: 'j34jn5js-d5cc-4ccd-ad33-1fc56bd6aeeb',
								name: 'John',
								email: 'example-email@gmail.com'
							},
							['...']
						]
					},
					request: {}
				}
			}
		})
		.input(z.void())
		.output(getUsersOutput),

	update: authProcedure
		.meta({
			openapi: {
				method: 'PUT',
				path: '/users/{userId}',
				tags: ['users'],
				summary: 'Update a user by id',
				protect: true,
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
		.output(updateUserOutput),
	delete: authProcedure
		.meta({
			openapi: {
				method: 'DELETE',
				path: '/users/{userId}',
				tags: ['users'],
				protect: true,
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
		.output(deleteUserOutput)
};

export default userProcedures;
