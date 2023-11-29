import { emailProcedures, emailService } from './index.js';

const emailController = {
	sendEmail: emailProcedures.sendEmail.mutation(async ({ input }) => {
		const emailSettings = await emailService.sendEmail(input);
		return {
			message: 'Email settings successfully added!',
			data: {}
		};
	})
};

export default emailController;
