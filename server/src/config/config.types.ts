export type TConfig = {
	APP_PORT: string;
	CLIENT_URL: string;
	MONGO_USER: string;
	MONGO_PASSWORD: string;
	MONGO_DB: string;
	MONGO_INITDB_DATABASE: string;
	MONGO_DB_HOST: string;
	MONGO_DB_PORT: string;
	ACCESS_JWT_SECRET: string;
	REFRESH_JWT_SECRET: string;
	ACCESS_JWT_EXPIRES_IN: string;
	REFRESH_JWT_EXPIRES_IN: string;
	BASE_APP_USER_EMAIL: string;
	BASE_APP_USER_PASSWORD: string;

	get(key: keyof TConfig): string;
};
