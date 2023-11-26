import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../utils/index.js';

export class EmailTemplateSchema {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ required: true, type: String })
	public template!: string;
}

export const EmailTemplateModel = getModelForClass(EmailTemplateSchema, {
	...baseModelOptions,
	options: { customName: 'template' }
});

export type EmailTemplateDocument = DocumentType<EmailTemplateSchema>;
