import * as mongoose from 'mongoose';
import { UserModel } from '../modules/user/models/index.js';
import { authService } from '../modules/auth/index.js';

export const db = {
	connect: async (cb: () => void) => {
		await mongoose.connect(
			`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_INITDB_DATABASE}`
		);

		cb();
	},
	initUser: async () => {
		const userDocsCount = await UserModel.countDocuments();
		if (!userDocsCount) {
			await authService.register({
				email: 'user@example.com',
				password: '12345678'
			});
		}
	}
};
