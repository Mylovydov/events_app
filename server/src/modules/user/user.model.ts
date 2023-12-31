import {
	DocumentType,
	getModelForClass,
	prop,
	Ref
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { EmailSettings } from '../emailSettings';
import { Settings } from '../appSettings';
import { Template } from '../emailTemplate';
import { baseModelOptions } from '../utils';

export class User {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ default: '' })
	public name!: string;

	@prop({ type: String, required: true, unique: true, index: true })
	public email!: string;

	@prop({ type: String, required: true })
	public password!: string;

	@prop({ ref: () => EmailSettings, type: () => String })
	public emailSettings!: Ref<EmailSettings, string>;

	@prop({ ref: () => Settings, type: () => String })
	public appSettings!: Ref<Settings, string>;

	@prop({ ref: () => Template, type: () => String })
	public emailTemplate!: Ref<Template, string>;
}

export const UserModel = getModelForClass(User, {
	...baseModelOptions
});

export type UserDocument = DocumentType<User>;
