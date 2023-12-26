import { authProcedure } from '../../trpc';
import { userExample } from '../../utils';

const userProcedures = {
	create: authProcedure.meta({
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
					message: 'User has been successfully registered!',
					data: userExample
				}
			}
		}
	}),
	getUser: authProcedure.meta({
		openapi: {
			method: 'GET',
			path: '/users',
			tags: ['users'],
			protect: true,
			summary: 'Get a user by id',
			example: {
				request: {
					userId: 'b24f24af-d5cc-4ccd-ad33-1fc56bd6aeeb'
				},
				response: {
					message: 'User was successfully found!',
					data: userExample
				}
			}
		}
	}),
	getUsers: authProcedure.meta({
		openapi: {
			method: 'GET',
			path: '/users/all',
			tags: ['users'],
			protect: true,
			summary: 'Get all users',
			example: {
				request: {},
				response: {
					message: 'Users successfully found!',
					data: [userExample, userExample, ['...']]
				}
			}
		}
	}),
	update: authProcedure.meta({
		openapi: {
			method: 'PUT',
			path: '/users',
			tags: ['users'],
			summary: 'Update a user by id',
			protect: true,
			example: {
				request: {
					userId: '6e6c331e-7f3a-44d4-bb33-7358d9f808f9',
					name: 'John',
					email: 'user@example.com'
				},
				response: {
					message: 'User was successfully updated!',
					data: userExample
				}
			}
		}
	}),
	delete: authProcedure.meta({
		openapi: {
			method: 'DELETE',
			path: '/users',
			tags: ['users'],
			protect: true,
			summary: 'Delete user by id',
			example: {
				request: {
					userId: '6e6c331e-7f3a-44d4-bb33-7358d9f808f9'
				},
				response: {
					message: 'User was successfully deleted!',
					data: userExample
				}
			}
		}
	})
};

export default userProcedures;
