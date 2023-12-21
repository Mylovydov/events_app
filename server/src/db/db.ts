import * as mongoose from 'mongoose';
import { authService, UserModel } from '../modules';
import { config } from '../config';
import { getLoggerError } from '../utils/helpers';
import { appLogger } from '../logger';

const db = {
	connect: async (cb: () => void) => {
		try {
			await mongoose.connect(
				`mongodb://${config.get('MONGO_USER')}:${config.get('MONGO_PASSWORD')}@${config.get('MONGO_DB_HOST')}:${config.get('MONGO_DB_PORT')}`
			);

			cb();
		} catch (err) {
			appLogger.error.log(
				getLoggerError({ message: `MongoDB connection error: ${err}` })
			);
			console.log(err);
		}
	},
	initUser: async () => {
		try {
			const userDocsCount = await UserModel.countDocuments();
			if (userDocsCount) {
				return;
			}

			await authService.register({
				email: config.get('BASE_APP_USER_EMAIL'),
				password: config.get('BASE_APP_USER_PASSWORD')
			});
		} catch (err) {
			appLogger.error.log(
				getLoggerError({ message: `Init user error: ${err}` })
			);
		}
	}
};

export default db;
