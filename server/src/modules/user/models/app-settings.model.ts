import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { baseModelOptions } from '../../utils/index.js';

export class Settings {
	@prop({ required: true, unique: true, default: () => uuidv4() })
	public _id!: string;

	@prop({ type: String, required: true, default: '#fbf1e6' })
	public highlightColor!: string;
}

export const AppSettingsModel = getModelForClass(Settings, {
	...baseModelOptions
});

export type AppSettingsDocument = DocumentType<Settings>;
