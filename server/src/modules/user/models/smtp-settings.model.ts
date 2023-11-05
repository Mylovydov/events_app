import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../../utils/index.js';

export class Smtp {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ required: true })
	public server!: string;
}

export const SmtpSettingsModel = getModelForClass(Smtp, {
	...baseModelOptions,
	options: { customName: 'smtp' }
});

export type SMTPSettingsDocument = DocumentType<Smtp>;
