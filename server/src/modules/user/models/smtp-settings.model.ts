import { DocumentType, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import User from './user.model.js';

@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
class Smtp {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ required: true })
	public server!: string;

	@prop({ ref: () => User, type: () => String })
	public user!: Ref<User, string>;
}

export type UserDocument = DocumentType<Smtp>;
export default Smtp;
