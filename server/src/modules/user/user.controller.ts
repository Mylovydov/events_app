import userService from './user.service.js';
import userProcedures from './user.procedures.js';

const userController = {
	create: userProcedures.create.mutation(async ({ input }) => {
		const user = await userService.create(input);
		return {
			message: 'User has been successfully registered!',
			data: user
		};
	}),

	getUser: userProcedures.getUser.query(async ({ input }) => {
		const user = await userService.getById(input.userId);
		return {
			message: 'User was successfully found!',
			data: user
		};
	}),

	getUsers: userProcedures.getUsers.query(async () => {
		const users = await userService.getAll();
		return {
			message: 'Users were successfully found!',
			data: users
		};
	}),

	update: userProcedures.update.mutation(async ({ input }) => {
		const user = await userService.update(input);
		return {
			message: 'User was successfully updated!',
			data: user
		};
	}),

	delete: userProcedures.delete.mutation(async ({ input: { userId } }) => {
		const user = await userService.delete(userId);
		return {
			message: 'User was successfully deleted!',
			data: user
		};
	}),

	addSmtpSettings: userProcedures.addSmtpSettings.mutation(
		async ({ input }) => {
			const smtpSettings = await userService.addSmtpSettings(input);
			return {
				message: 'SMTP settings was successfully added!',
				data: smtpSettings
			};
		}
	),

	addAppSettings: userProcedures.addAppSettings.mutation(async ({ input }) => {
		const updatedUser = await userService.addAppSettings(input);
		return {
			message: 'App settings was successfully added!',
			data: updatedUser
		};
	})
};

export default userController;
