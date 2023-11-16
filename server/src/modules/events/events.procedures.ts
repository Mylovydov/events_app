import { publicProcedure } from '../../trpc/index.js';
import { exampleBase64CSV, exampleEvents } from '../../utils/index.js';
import { z } from 'zod';
import { createEventsInput, createEventsOutput } from './events.dto.js';

const eventsProcedures = {
	create: publicProcedure
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

	getEvents: publicProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/events',
				tags: ['events'],
				summary: 'Get all uploaded events',
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
		.input(z.void())
		.output(createEventsOutput)
};

export default eventsProcedures;