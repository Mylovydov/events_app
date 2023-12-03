import * as mongoose from 'mongoose';
import { authService } from '../modules/auth/index.js';
import { UserModel } from '../modules/index.js';
import { config } from '../config/index.js';

export const db = {
	connect: async (cb: () => void) => {
		await mongoose.connect(
			`mongodb://${config.get('MONGO_USER')}:${config.get(
				'MONGO_PASSWORD'
			)}@${config.get('MONGO_DB_HOST')}:${config.get(
				'MONGO_DB_PORT'
			)}/${config.get('MONGO_INITDB_DATABASE')}`
		);

		cb();
	},
	initUser: async () => {
		const userDocsCount = await UserModel.countDocuments();
		if (userDocsCount) {
			return;
		}

		await authService.register({
			email: process.env.BASE_APP_USER_EMAIL ?? 'user@example.com',
			password: process.env.BASE_APP_USER_PASSWORD ?? '12345678'
		});
	}
};
