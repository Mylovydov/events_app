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
class Token {
	@prop({ required: true })
	public userId!: string;

	@prop({ required: true })
	public refreshToken!: string;
}

export const TokenModel = getModelForClass(Token, {
	schemaOptions: {
		versionKey: false
	}
});

export type TokenDocument = DocumentType<Token>;
