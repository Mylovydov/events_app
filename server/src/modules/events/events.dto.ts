import { z } from 'zod';

const minLengthErrorMessage = 'Must be 5 or more characters long';
const maxLengthErrorMessage = 'Must be 5 or fewer characters long';
const idErrorMessage = 'Invalid UUID';

export const eventSchema = z.object({
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

export const eventSchemaDb = eventSchema
	.omit({ startDateTime: true, endDateTime: true })
	.extend({
		_id: z.string().uuid(),
		isEmailSend: z.boolean(),
		endDateTime: z.any(),
		createdAt: z.any(),
		updatedAt: z.any(),
		// startDateTime: z.date(),
		startDateTime: z.date()
	});

export const eventsSchema = z.array(eventSchema);
export const eventsSchemaDb = z.array(eventSchemaDb);
