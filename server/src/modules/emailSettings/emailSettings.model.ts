import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../utils/index.js';

export class EmailSettings {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ type: String, default: 'gmail', required: false })
	public service!: string;

	@prop({ type: String, required: false, default: '' })
	public servicePassword!: string;

	@prop({ type: String, required: false, default: '' })
	public serviceEmail!: string;

	@prop({ type: Boolean, required: false, default: false })
	public isSettingsVerified!: boolean;
}

export const EmailSettingsModel = getModelForClass(EmailSettings, {
	...baseModelOptions
});

export type EmailSettingsDocument = DocumentType<EmailSettings>;
