import {
	DocumentType,
	getModelForClass,
	modelOptions,
	prop
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
class User {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop()
	public name?: string;

	@prop({ type: String, required: true, unique: true, index: true })
	public email!: string;

	@prop({ type: String, required: true })
	public password!: string;
}

export const UserModel = getModelForClass(User, {
	schemaOptions: {
		versionKey: false
	}
});

export type UserDocument = DocumentType<User>;
