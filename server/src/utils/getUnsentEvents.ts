import { EventDocument } from '../modules/index.js';

const getUnsentEvents = (events: EventDocument[]) =>
	events.filter(event => !event.isEmailSend);

export default getUnsentEvents;
