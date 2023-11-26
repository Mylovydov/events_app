import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../utils/index.js';

export class Template {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ required: true, type: String })
	public template!: string;

	@prop({ required: true, type: String })
	public design!: string;
}

export const EmailTemplateModel = getModelForClass(Template, {
	...baseModelOptions
});

export type EmailTemplateDocument = DocumentType<Template>;
