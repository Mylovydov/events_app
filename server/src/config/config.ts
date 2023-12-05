import { TConfig } from './config.types.js';

const config: TConfig = {
	APP_PORT: process.env.APP_PORT || '4200',
	CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
	MONGO_USER: process.env.MONGO_USER || 'user',
	MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'userpasswd',
	MONGO_DB: process.env.MONGO_DB || 'events_db',
	MONGO_INITDB_DATABASE: process.env.MONGO_INITDB_DATABASE || 'events_db',
	MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
	MONGO_DB_PORT: process.env.MONGO_DB_PORT || '27018',
	ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET || 'secret-access-key',
	REFRESH_JWT_SECRET: process.env.ACCESS_JWT_SECRET || 'secret-refresh-key',
	ACCESS_JWT_EXPIRES_IN: process.env.ACCESS_JWT_EXPIRES_IN || '10h',
	REFRESH_JWT_EXPIRES_IN: process.env.REFRESH_JWT_EXPIRES_IN || '30d',

	get(key: keyof Omit<TConfig, 'get'>) {
		return this[key];
	}
};

export default config;
