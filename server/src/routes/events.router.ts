import { router } from '../trpc/index.js';
import { eventsController } from '../modules/index.js';

const eventsRouter = router({
	create: eventsController.create,
	getEvents: eventsController.getEvents,
	getEvent: eventsController.getEvent
});

export default eventsRouter;
