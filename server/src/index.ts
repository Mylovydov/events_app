import 'dotenv/config';
import { app } from './app.js';
import config from './config/config.js';
import { db } from './db/index.js';

const PORT = config.get('APP_PORT');

const start = async () => {
	try {
		// TODO: add logger
		await db.connect(() => console.log('Connected to database'));
		await db.initUser();
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (err) {
		console.error(err);
	}
};

start();
