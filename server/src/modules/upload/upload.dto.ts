import { z } from 'zod';
import { eventsSchemaDb } from '../events/events.dto.js';
import { baseOutputSchema } from '../utils/index.js';

export const uploadInput = z.object({
	file: z.string()
});

export const uploadOutput = baseOutputSchema.extend({
	data: eventsSchemaDb
});
