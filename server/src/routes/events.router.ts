import { router } from '../trpc/index.js';
import eventsController from '../modules/events/events.controller.js';

const eventsRouter = router({
	create: eventsController.create,
	getEvents: eventsController.getEvents
});

export default eventsRouter;
