import { authProcedure } from '../../trpc';

const emailProcedures = {
	sendInvitationToEvent: authProcedure.meta({
		openapi: {
			method: 'POST',
			path: '/email/send-invitation',
			tags: ['email'],
			summary: 'Send email invitation to event',
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
	}),

	sendInvitationToEvents: authProcedure.meta({
		openapi: {
			method: 'POST',
			path: '/email/send-invitations',
			tags: ['email'],
			summary: 'Send email invitation to events',
			protect: true,
			example: {
				request: {
					userId: '5fe3dd3c-fd7b-4976-9692-1702878c68c4'
				},
				response: {
					message: 'Emails successfully sent!',
					data: {}
				}
			}
		}
	}),
	resendAllInvitationToEvents: authProcedure.meta({
		openapi: {
			method: 'POST',
			path: '/email/resend-all-invitations',
			tags: ['email'],
			summary: 'Resend all email invitations to events',
			protect: true,
			example: {
				request: {
					userId: '5fe3dd3c-fd7b-4976-9692-1702878c68c4'
				},
				response: {
					message: 'Invitations successfully resent!',
					data: {}
				}
			}
		}
	})
};

export default emailProcedures;
