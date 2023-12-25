import { authProcedure } from '../../trpc';
import { exampleBase64CSV, exampleEvents } from '../../utils';

const eventsProcedures = {
	create: authProcedure.meta({
		openapi: {
			method: 'POST',
			path: '/events',
			tags: ['events'],
			summary: 'Upload file in base64 format',
			protect: true,
			example: {
				request: {
					file: exampleBase64CSV,
					userId: '60f1b2b0-0b7a-4e1a-9b0a-0b9e2b7b3b1b'
				},
				response: {
					message: 'Events successfully created!',
					data: exampleEvents
				}
			}
		}
	}),
	getEvents: authProcedure.meta({
		openapi: {
			method: 'GET',
			path: '/events',
			tags: ['events'],
			summary: 'Get all uploaded events and sorting',
			protect: true,
			example: {
				request: {
					sortDirection: 'asc',
					sortKey: 'startDateTime',
					page: 1,
					limit: 5
				},
				response: {
					message: 'Events successfully found!',
					data: exampleEvents
				}
			}
		}
	}),
	getEvent: authProcedure.meta({
		openapi: {
			method: 'GET',
			path: '/events/{eventId}',
			tags: ['events'],
			summary: 'Get event by id',
			protect: true,
			example: {
				request: {
					eventId: '60f1b2b0-0b7a-4e1a-9b0a-0b9e2b7b3b1b'
				},
				response: {
					message: 'Event successfully found!',
					data: exampleEvents[0]
				}
			}
		}
	}),
	changeEmailSentStatus: authProcedure.meta({
		openapi: {
			method: 'PUT',
			path: '/events/change-sent-status',
			tags: ['events'],
			summary: 'Change email sent status',
			protect: true,
			example: {
				request: {
					eventId: '60f1b2b0-0b7a-4e1a-9b0a-0b9e2b7b3b1b',
					isEmailSend: true
				},
				response: {
					message: 'Email sent status successfully changed!',
					data: exampleEvents[0]
				}
			}
		}
	})
};

export default eventsProcedures;
