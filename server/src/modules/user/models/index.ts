import { getModelForClass } from '@typegoose/typegoose';
import Smtp from './smtp-settings.model.js';
import User from './user.model.js';

export const SmtpSettingsModel = getModelForClass(Smtp, {
	schemaOptions: {
		versionKey: false
	}
});

export const UserModel = getModelForClass(User, {
	schemaOptions: {
		versionKey: false
	}
});
