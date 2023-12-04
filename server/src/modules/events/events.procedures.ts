import { authProcedure } from '../../trpc/index.js';
import { exampleBase64CSV, exampleEvents } from '../../utils/index.js';
import {
	changeEmailSentStatusInput,
	changeEmailSentStatusOutput,
	createEventsInput,
	createEventsOutput,
	getEventInput,
	getEventOutput,
	getEventsInput,
	getEventsOutput
} from './events.dto.js';

const eventsProcedures = {
	create: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/events',
				tags: ['events'],
				summary: 'Upload file in base64 format',
				protect: true,
				example: {
					request: {
						file: exampleBase64CSV
					},
					response: {
						message: '',
						data: exampleEvents
					}
				}
			}
		})
		.input(createEventsInput)
		.output(createEventsOutput),

	getEvents: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/events',
				tags: ['events'],
				summary: 'Get all uploaded events and sorting',
				protect: true,
				example: {
					// request: {},
					response: {
						message: '',
						data: exampleEvents
					}
				}
			}
		})
		.input(getEventsInput)
		.output(getEventsOutput),

	getEvent: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/events/{eventId}',
				tags: ['events'],
				summary: 'Get event by id',
				protect: true,
				example: {
					// request: {},
					response: {
						message: '',
						data: exampleEvents[0]
					}
				}
			}
		})
		.input(getEventInput)
		.output(getEventOutput),

	changeEmailSentStatus: authProcedure
		.meta({
			openapi: {
				method: 'PUT',
				path: '/events/change-sent-status',
				tags: ['events'],
				summary: 'Change email sent status',
				protect: true,
				example: {
					request: {
						eventId: '',
						isEmailSend: true
					},
					response: {
						message: '',
						data: exampleEvents
					}
				}
			}
		})
		.input(changeEmailSentStatusInput)
		.output(changeEmailSentStatusOutput)
};

export default eventsProcedures;
