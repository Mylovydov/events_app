import emailProcedures from './email.procedures';
import { sendEmailInput, sendEmailOutput, sendEmailsInput } from './email.dto';
import emailService from './email.service';

const emailController = {
	sendInvitationToEvent: emailProcedures.sendInvitationToEvent
		.input(sendEmailInput)
		.output(sendEmailOutput)
		.mutation(async ({ input }) => {
			await emailService.sendInvitationToEvent(input);
			return {
				message: 'Email successfully sent!',
				data: {}
			};
		}),

	sendInvitationToEvents: emailProcedures.sendInvitationToEvents
		.input(sendEmailsInput)
		.output(sendEmailOutput)
		.mutation(async ({ input }) => {
			await emailService.sendInvitationToEvents(input);
			return {
				message: 'Emails successfully sent!',
				data: {}
			};
		}),

	resendAllInvitationToEvents: emailProcedures.resendAllInvitationToEvents
		.input(sendEmailsInput)
		.output(sendEmailOutput)
		.mutation(async ({ input }) => {
			await emailService.sendInvitationToEvents(input, false);
			return {
				message: 'Invitations successfully resent!',
				data: {}
			};
		})
};

export default emailController;
