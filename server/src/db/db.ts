import * as mongoose from 'mongoose';
import { authService, UserModel } from '../modules';
import { config } from '../config';
import { getLoggerError } from '../utils/helpers';
import { appLogger } from '../logger';

const db = {
	connect: async (cb: () => void) => {
		try {
			await mongoose.connect(
				`mongodb://${config.get('MONGO_USER')}:${config.get(
					'MONGO_PASSWORD'
				)}@${config.get('MONGO_DB_HOST')}:${config.get(
					'MONGO_DB_PORT'
				)}/${config.get('MONGO_INITDB_DATABASE')}`
			);

			cb();
		} catch (err) {
			appLogger.error.log(
				getLoggerError({ message: `MongoDB connection error: ${err}` })
			);
		}
	},
	initUser: async () => {
		try {
			const userDocsCount = await UserModel.countDocuments();
			if (userDocsCount) {
				return;
			}

			await authService.register({
				email: process.env.BASE_APP_USER_EMAIL ?? 'user@example.com',
				password: process.env.BASE_APP_USER_PASSWORD ?? '12345678'
			});
		} catch (err) {
			appLogger.error.log(
				getLoggerError({ message: `Init user error: ${err}` })
			);
		}
	}
};

export default db;
