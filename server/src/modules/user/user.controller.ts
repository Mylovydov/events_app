import userService from './user.service.js';
import userProcedures from './user.procedures.js';

const userController = {
	create: userProcedures.create.mutation(async ({ input }) => {
		const user = await userService.create(input);
		return {
			id: user.id,
			email: user.email,
			name: user.name
		};
	}),
	get: userProcedures.getUser.query(async ({ input }) => {
		const user = await userService.getById(input.userId);
		return {
			id: user.id,
			email: user.email,
			name: user.name
		};
	}),
	update: userProcedures.update.mutation(async ({ input }) => {
		const user = await userService.update(input);
		return {
			id: user.id,
			email: user.email,
			name: user.name
		};
	}),
	delete: userProcedures.delete.mutation(
		async ({ input: { userId } }) => await userService.delete(userId)
	)
};

export default userController;
