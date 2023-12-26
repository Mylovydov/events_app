import { router } from '../trpc';
import { eventsController } from '../modules';

const eventsRouter = router({
	create: eventsController.create,
	getEvents: eventsController.getEvents,
	getEvent: eventsController.getEvent,
	changeEmailSentStatus: eventsController.changeEmailSentStatus
});

export default eventsRouter;
