import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';
import { mainUserSchema } from '../user/index.js';
import zodErrorMessage from '../../utils/zodErrorMessage.js';

export const mainEventSchema = z.object({
	inviteeLastName: z
		.string()
		.min(1, { message: zodErrorMessage.min('inviteeLastName', 1) }),
	inviteeFirstName: z
		.string()
		.min(1, { message: zodErrorMessage.min('inviteeFirstName', 1) }),
	inviteeEmail: z.string().email(zodErrorMessage.email),
	startDateTime: z
		.string()
		.min(1, { message: zodErrorMessage.min('startDateTime', 1) }),
	endDateTime: z
		.string()
		.min(1, { message: zodErrorMessage.min('endDateTime', 1) }),
	location: z.string().min(1, { message: zodErrorMessage.min('location', 1) }),
	eventUUID: z.string().uuid(zodErrorMessage.id),
	inviteeUUID: z.string().uuid(zodErrorMessage.id)
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

export const changeEmailSentStatusInput = z.object({
	eventId: eventSchemaDb.shape._id,
	isEmailSend: eventSchemaDb.shape.isEmailSend
});

export const changeEmailSentStatusOutput = baseOutputSchema.extend({
	data: eventSchemaDb
});
