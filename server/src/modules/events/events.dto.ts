import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';

const minLengthErrorMessage = 'Must be 5 or more characters long';
const maxLengthErrorMessage = 'Must be 5 or fewer characters long';
const idErrorMessage = 'Invalid UUID';

export const mainEventSchema = z.object({
	inviteeLastName: z
		.string()
		.min(3, { message: minLengthErrorMessage })
		.max(255, { message: maxLengthErrorMessage }),
	inviteeFirstName: z
		.string()
		.min(3, { message: minLengthErrorMessage })
		.max(255, { message: maxLengthErrorMessage }),
	inviteeEmail: z
		.string()
		.min(5, { message: minLengthErrorMessage })
		.email('Invalid email')
		.max(255, { message: maxLengthErrorMessage }),
	startDateTime: z.string().datetime(),
	endDateTime: z.string().datetime(),
	location: z
		.string()
		.min(3, { message: minLengthErrorMessage })
		.max(255, { message: maxLengthErrorMessage }),
	eventUUID: z.string().uuid(idErrorMessage),
	inviteeUUID: z.string().uuid(idErrorMessage)
});

export const eventSchemaDb = mainEventSchema
	.omit({ startDateTime: true, endDateTime: true })
	.extend({
		_id: z.string().uuid(),
		isEmailSend: z.boolean(),
		endDateTime: z.any(),
		createdAt: z.any(),
		updatedAt: z.any(),
		startDateTime: z.any()
		// startDateTime: z.date(),
	});

export const eventsSchema = z.array(mainEventSchema);
export const eventsSchemaDb = z.array(eventSchemaDb);

export const createEventsInput = z.object({
	file: z.string()
});

export const getEventsInput = z.object({
	sortDirection: z.enum(['asc', 'desc']).optional(),
	// sortField: z.enum(['startDateTime', 'endDateTime']).optional()
	sortKey: eventSchemaDb.keyof().optional()
});

export const createEventsOutput = baseOutputSchema.extend({
	data: eventsSchemaDb
});
