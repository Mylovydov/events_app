import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

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
}

export type UserDocument = DocumentType<Smtp>;
export default Smtp;
