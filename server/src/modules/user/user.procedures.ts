import { authProcedure, publicProcedure } from '../../trpc/index.js';
import {
	addAppSettingsInput,
	addSmtpSettingsInput,
	baseUserOutput,
	createUserInput,
	getUsersOutput,
	updateUserInput,
	userIdInput
} from './dto/index.js';
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
		.output(baseUserOutput),

	getUser: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/users',
				tags: ['users'],
				protect: true,
				summary: 'Get a user by id',
				example: {
					response: {
						id: 'b24f24af-d5cc-4ccd-ad33-1fc56bd6aeeb',
						name: 'John Doe',
						email: 'user@example.com'
					},
					request: {
						userId: 'b24f24af-d5cc-4ccd-ad33-1fc56bd6aeeb'
					}
				}
			}
		})
		.input(userIdInput)
		.output(baseUserOutput),

	getUsers: publicProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/users/all',
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
				path: '/users',
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
						userId: '6e6c331e-7f3a-44d4-bb33-7358d9f808f9',
						name: 'John',
						email: 'user@example.com'
					}
				}
			}
		})
		.input(updateUserInput)
		.output(baseUserOutput),

	delete: authProcedure
		.meta({
			openapi: {
				method: 'DELETE',
				path: '/users',
				tags: ['users'],
				protect: true,
				summary: 'Delete user by id',
				example: {
					response: {},
					request: {
						userId: '6e6c331e-7f3a-44d4-bb33-7358d9f808f9'
					}
				}
			}
		})
		.input(userIdInput)
		.output(baseUserOutput),

	addSmtpSettings: authProcedure
		.meta({
			openapi: {
				method: 'PUT',
				path: '/users/smtp-settings',
				tags: ['users'],
				protect: true,
				summary: 'Add SMTP settings to user by id',
				example: {
					response: {},
					request: {
						userId: '10db6a2d-0dd8-44f8-a603-b5a69723e751',
						server: 'smtp.gmail.com'
					}
				}
			}
		})
		.input(addSmtpSettingsInput)
		.output(baseUserOutput),

	addAppSettings: authProcedure
		.meta({
			openapi: {
				method: 'PUT',
				path: '/users/app-settings',
				tags: ['users'],
				protect: true,
				summary: 'Add app settings to user by id',
				example: {
					response: {},
					request: {
						userId: '10db6a2d-0dd8-44f8-a603-b5a69723e751',
						highlightColor: '#fbf1e6'
					}
				}
			}
		})
		.input(addAppSettingsInput)
		.output(baseUserOutput)
};

export default userProcedures;
