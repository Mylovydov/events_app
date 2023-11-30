import eventsProcedures from './events.procedures.js';
import { eventsService } from './index.js';

const eventsController = {
	create: eventsProcedures.create.mutation(async ({ input }) => {
		const createdEvents = await eventsService.create(input);

		return {
			message: 'Events successfully created!',
			data: createdEvents
		};
	}),

	getEvents: eventsProcedures.getEvents.query(async ({ input }) => {
		const eventsData = await eventsService.getEvents(input);

		return {
			message: 'Events successfully found!',
			data: eventsData
		};
	}),

	getEvent: eventsProcedures.getEvent.query(async ({ input }) => {
		const event = await eventsService.getEvent(input);

		return {
			message: 'Event successfully found!',
			data: event
		};
	})
};

export default eventsController;
