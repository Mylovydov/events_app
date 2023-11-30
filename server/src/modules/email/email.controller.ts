import { emailProcedures, emailService } from './index.js';

const emailController = {
	sendEmailInvitationToEvent:
		emailProcedures.sendEmailInvitationToEvent.mutation(async ({ input }) => {
			await emailService.sendEmailInvitationToEvent(input);
			return {
				message: 'Email successfully sent!',
				data: {}
			};
		})
};

export default emailController;
