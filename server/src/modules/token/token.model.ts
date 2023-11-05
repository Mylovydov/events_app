import {
	DocumentType,
	getModelForClass,
	modelOptions,
	prop
} from '@typegoose/typegoose';
import { baseModelOptions } from '../utils/index.js';

@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
class Token {
	@prop({ required: true })
	public userId!: string;

	@prop({ required: true })
	public refreshToken!: string;
}

export const TokenModel = getModelForClass(Token, baseModelOptions);

export type TokenDocument = DocumentType<Token>;
