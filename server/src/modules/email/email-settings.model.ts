import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../utils/index.js';

export class EmailSettings {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ type: String, default: 'gmail' })
	public service!: string;

	@prop({ type: String, required: true })
	public pass!: string;

	@prop({ type: String, required: true })
	public user!: string;
}

export const EmailSettingsModel = getModelForClass(EmailSettings, {
	...baseModelOptions
});

export type EmailSettingsDocument = DocumentType<EmailSettings>;
