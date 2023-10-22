import 'dotenv/config';
import { app } from './app.js';
import { db } from './db/db.js';

const PORT = process.env.APP_PORT || 4200;

const start = async () => {
	try {
		await db.connect(() => console.log('Connected to database'));
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (err) {
		console.error(err);
	}
};

start();
