import eventsProcedures from './events.procedures.js';
import eventsService from './events.service.js';

const eventsController = {
	create: eventsProcedures.create.mutation(async ({ input }) => {
		const createdEvents = await eventsService.create(input.file);
		return {
			message: 'Events successfully created',
			data: createdEvents
		};
	}),

	getEvents: eventsProcedures.getEvents.query(async () => {
		const events = await eventsService.getEvents();
		return {
			message: 'Events successfully created',
			data: events
		};
	})
};

export default eventsController;
