import * as mongoose from 'mongoose';

export const db = {
	connect: async (cb: () => void) => {
		await mongoose.connect(
			`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_INITDB_DATABASE}`
		);

		cb();
	}
};
