import {
	DocumentType,
	getModelForClass,
	modelOptions,
	prop
} from '@typegoose/typegoose';

@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
class User {
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
