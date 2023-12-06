import 'dotenv/config';
import { app } from './app.js';
import { db } from './db/db.js';
import config from './config/config.js';

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
