import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';
import { mainUserSchema } from '../user/index.js';

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
		.email('Invalid emailSettings')
		.max(255, { message: maxLengthErrorMessage }),
	startDateTime: z.string(),
	endDateTime: z.string(),
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
		userId: z.optional(z.string().uuid().or(mainUserSchema)),
		isEmailSend: z.boolean(),
		endDateTime: z.string(),
		startDateTime: z.string(),
		createdAt: z.any(),
		updatedAt: z.any()
	});

export const eventsSchema = z.array(mainEventSchema.strict());
export const eventsSchemaDb = z.array(eventSchemaDb);

export const createEventsInput = z.object({
	file: z.string(),
	userId: mainUserSchema.shape._id
});

export const createEventsOutput = baseOutputSchema.extend({
	data: eventsSchemaDb
});

export const getEventsInput = z.object({
	sortDirection: z.enum(['asc', 'desc']).optional(),
	sortKey: eventSchemaDb.keyof().optional(),
	page: z.number().optional(),
	limit: z.number().optional(),
	userId: mainUserSchema.shape._id
});

export const getEventsOutput = baseOutputSchema.extend({
	data: z.object({
		events: eventsSchemaDb,
		total: z.number(),
		skip: z.number(),
		limit: z.number(),
		pageCount: z.number()
	})
});

export const getEventInput = z.object({
	eventId: eventSchemaDb.shape._id
});

export const getEventOutput = baseOutputSchema.extend({
	data: eventSchemaDb
});
