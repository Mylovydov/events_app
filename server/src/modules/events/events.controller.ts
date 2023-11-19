import eventsProcedures from './events.procedures.js';
import eventsService from './events.service.js';

const eventsController = {
	create: eventsProcedures.create.mutation(async ({ input }) => {
		const createdEvents = await eventsService.create(input.file);
		return {
			message: 'Events successfully created!',
			data: createdEvents
		};
	}),

	getEvents: eventsProcedures.getEvents.query(async ({ input }) => {
		const events = await eventsService.getEvents(input);
		return {
			message: 'Events successfully found!',
			data: events
		};
	})
};

export default eventsController;
