import eventsProcedures from './events.procedures';
import {
	changeEmailSentStatusInput,
	changeEmailSentStatusOutput,
	createEventsInput,
	createEventsOutput,
	getEventInput,
	getEventOutput,
	getEventsInput,
	getEventsOutput
} from './events.dto';
import eventsService from './events.service';

const eventsController = {
	create: eventsProcedures.create
		.input(createEventsInput)
		.output(createEventsOutput)
		.mutation(async ({ input }) => {
			const createdEvents = await eventsService.create(input);

			return {
				message: 'Events successfully created!',
				data: createdEvents
			};
		}),

	getEvents: eventsProcedures.getEvents
		.input(getEventsInput)
		.output(getEventsOutput)
		.query(async ({ input }) => {
			const eventsData = await eventsService.getEvents(input);

			return {
				message: 'Events successfully found!',
				data: eventsData
			};
		}),

	getEvent: eventsProcedures.getEvent
		.input(getEventInput)
		.output(getEventOutput)
		.query(async ({ input }) => {
			const event = await eventsService.getEvent(input);

			return {
				message: 'Event successfully found!',
				data: event
			};
		}),

	changeEmailSentStatus: eventsProcedures.changeEmailSentStatus
		.input(changeEmailSentStatusInput)
		.output(changeEmailSentStatusOutput)
		.query(async ({ input }) => {
			const event = await eventsService.changeEmailSentStatus(input);

			return {
				message: 'Email sent status successfully changed!',
				data: event
			};
		})
};

export default eventsController;
