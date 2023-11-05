import { DocumentType, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import Smtp from './smtp-settings.model.js';

@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
class User {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ default: '' })
	public name!: string;

	@prop({ type: String, required: true, unique: true, index: true })
	public email!: string;

	@prop({ type: String, required: true })
	public password!: string;

	@prop({ type: Boolean, required: true, default: false })
	public autoEmailSending!: boolean;

	@prop({ ref: () => Smtp, type: () => String })
	public smtpSettings!: Ref<Smtp, string>;
}

export default User;

export type UserDocument = DocumentType<User>;
