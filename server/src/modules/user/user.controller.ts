import userService from './user.service.js';
import {
	createUserProcedure,
	deleteUserProcedure,
	getUserProcedure,
	updateUserProcedure
} from './user.procedures.js';

const userController = {
	create: createUserProcedure.mutation(async ({ input }) => {
		const user = await userService.create(input);
		return {
			id: user.id,
			email: user.email,
			name: user.name
		};
	}),
	get: getUserProcedure.query(async ({ input }) => {
		const user = await userService.getById(input.userId);
		return {
			id: user.id,
			email: user.email,
			name: user.name
		};
	}),
	update: updateUserProcedure.mutation(async ({ input }) => {
		const user = await userService.update(input);
		return {
			id: user.id,
			email: user.email,
			name: user.name
		};
	}),
	delete: deleteUserProcedure.mutation(
		async ({ input: { userId } }) => await userService.delete(userId)
	)
};

export default userController;
