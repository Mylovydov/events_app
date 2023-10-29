import {
	DocumentType,
	getModelForClass,
	index,
	modelOptions,
	prop
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
@index({ eventUUID: 1, inviteeUUID: 1 })
class Event {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ required: true, type: String })
	public inviteeLastName!: string;

	@prop({ required: true, type: String })
	public inviteeFirstName!: string;

	@prop({ required: true, type: String, unique: false })
	public inviteeEmail?: string;

	@prop({ required: true, type: Date })
	public startDateTime!: string;

	@prop({ required: true, type: Date })
	public endDateTime!: string;

	@prop({ required: true, type: String })
	public location!: string;

	@prop({ required: true, type: String })
	public eventUUID!: string;

	@prop({ required: true, type: String })
	public inviteeUUID!: string;

	@prop({ required: true, type: Boolean, default: false })
	public isEmailSend!: boolean;
}

export const EventModel = getModelForClass(Event, {
	schemaOptions: {
		versionKey: false
	}
});

export type EventDocument = DocumentType<Event>;
