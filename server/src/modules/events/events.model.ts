import {
	DocumentType,
	getModelForClass,
	index,
	prop,
	Ref
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../utils/index.js';
import { User } from '../user/index.js';

@index({ eventUUID: 1, inviteeUUID: 1 })
class Event {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ required: true, type: String })
	public inviteeLastName!: string;

	@prop({ required: true, type: String })
	public inviteeFirstName!: string;

	@prop({ required: true, type: String, unique: false })
	public inviteeEmail!: string;

	@prop({ required: true, type: String })
	public startDateTime!: string;

	@prop({ required: true, type: String })
	public endDateTime!: string;

	@prop({ required: true, type: String })
	public location!: string;

	@prop({ required: true, type: String })
	public eventUUID!: string;

	@prop({ required: true, type: String })
	public inviteeUUID!: string;

	@prop({ required: true, type: Boolean, default: false })
	public isEmailSend!: boolean;

	@prop({ ref: () => User, type: () => String })
	public userId!: Ref<User, string>;
}

export const EventModel = getModelForClass(Event, {
	...baseModelOptions
});

export type EventDocument = DocumentType<Event>;
