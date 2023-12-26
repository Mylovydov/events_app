import userProcedures from './user.procedures';
import userService from './user.service';
import {
	baseUserOutput,
	createUserInput,
	getUsersOutput,
	updateUserInput,
	userIdInput
} from './user.dto';
import { z } from 'zod';

const userController = {
	create: userProcedures.create
		.input(createUserInput)
		.output(baseUserOutput)
		.mutation(async ({ input }) => {
			const user = await userService.create(input);

			return {
				message: 'User has been successfully registered!',
				data: user
			};
		}),

	getUser: userProcedures.getUser
		.input(userIdInput)
		.output(baseUserOutput)
		.query(async ({ input }) => {
			const user = await userService.getById(input.userId);

			return {
				message: 'User was successfully found!',
				data: user
			};
		}),

	getUsers: userProcedures.getUsers
		.input(z.void())
		.output(getUsersOutput)
		.query(async () => {
			const users = await userService.getAll();
			return {
				message: 'Users were successfully found!',
				data: users
			};
		}),

	update: userProcedures.update
		.input(updateUserInput)
		.output(baseUserOutput)
		.mutation(async ({ input }) => {
			const user = await userService.update(input);
			return {
				message: 'User was successfully updated!',
				data: user
			};
		}),

	delete: userProcedures.delete
		.input(userIdInput)
		.output(baseUserOutput)
		.mutation(async ({ input: { userId } }) => {
			const user = await userService.delete(userId);
			return {
				message: 'User was successfully deleted!',
				data: user
			};
		})
};

export default userController;
