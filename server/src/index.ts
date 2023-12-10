import 'dotenv/config';
import { app } from './app.js';
import config from './config/config.js';
import { db } from './db/index.js';
import { appLogger } from './logger/index.js';
import { getLoggerInfo } from './utils/helpers/index.js';

const PORT = config.get('APP_PORT');

const start = async () => {
	try {
		await db.connect(() =>
			appLogger.info.log(getLoggerInfo('Connected to database'))
		);
		await db.initUser();
		app.listen(PORT, () =>
			appLogger.info.log(getLoggerInfo(`Server running on port ${PORT}`))
		);
	} catch (err) {
		console.error(err);
	}
};

start();
