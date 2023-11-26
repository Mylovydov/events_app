import { emailProcedures, emailService } from './index.js';

const emailController = {
	addEmailSettings: emailProcedures.addEmailSettings.mutation(
		async ({ input }) => {
			const createdEvents = await emailService.addEmailSettings();
			return {
				message: 'Events successfully created!',
				data: createdEvents
			};
		}
	)
};

export default emailController;
