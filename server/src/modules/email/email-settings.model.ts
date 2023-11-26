import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../utils/index.js';

export class EmailSettings {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ required: true })
	public server!: string;
}

export const EmailSettingsModel = getModelForClass(EmailSettings, {
	...baseModelOptions
});

export type SMTPSettingsDocument = DocumentType<EmailSettings>;
