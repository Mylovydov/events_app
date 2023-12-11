import { EventDocument } from '../../modules';

const getUnsentEvents = (events: EventDocument[]) =>
	events.filter(event => !event.isEmailSend);

export default getUnsentEvents;
