import { publicProcedure } from '../../trpc/index.js';
import { sendEmailInput, sendEmailOutput } from './email.dto.js';

const emailProcedures = {
	sendEmailInvitationToEvent: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email/send-email-invitation',
				tags: ['email'],
				summary: 'Send email',
				protect: true,
				example: {
					request: {
						eventId: '337f76ef-9ab3-438b-b7ce-56e64c123ccc',
						userId: '5fe3dd3c-fd7b-4976-9692-1702878c68c4'
					},
					response: {
						message: 'Email successfully sent!',
						data: {}
					}
				}
			}
		})
		.input(sendEmailInput)
		.output(sendEmailOutput)
};

export default emailProcedures;
