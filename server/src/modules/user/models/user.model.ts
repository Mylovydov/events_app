import {
	DocumentType,
	getModelForClass,
	prop,
	Ref
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../../utils/index.js';
import { Smtp } from './smtp-settings.model.js';
import { Settings } from './app-settings.model.js';
import { EmailTemplateSchema } from '../../emailTemplate/emailTemplates.model.js';

class User {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ default: '' })
	public name!: string;

	@prop({ type: String, required: true, unique: true, index: true })
	public email!: string;

	@prop({ type: String, required: true })
	public password!: string;

	@prop({ ref: () => Smtp, type: () => String })
	public smtpSettings!: Ref<Smtp, string>;

	@prop({ ref: () => Settings, type: () => String })
	public appSettings!: Ref<Settings, string>;

	@prop({ ref: () => Settings, type: () => String })
	public emailTemplate!: Ref<EmailTemplateSchema, string>;
}

export const UserModel = getModelForClass(User, {
	...baseModelOptions,
	options: { customName: 'user' }
});

export type UserDocument = DocumentType<User>;
