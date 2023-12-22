export type TConfig = {
	API_PORT: string;
	CLIENT_URL: string;

	MONGO_USER: string;
	MONGO_PASSWORD: string;
	MONGO_DB_NAME: string;
	MONGO_DB_HOST: string;
	MONGO_DB_PORT: string;
	MONGO_DB_URL: string;

	ACCESS_JWT_SECRET: string;
	REFRESH_JWT_SECRET: string;
	ACCESS_JWT_EXPIRES_IN: string;
	REFRESH_JWT_EXPIRES_IN: string;
	BASE_APP_USER_EMAIL: string;
	BASE_APP_USER_PASSWORD: string;

	get(key: keyof TConfig): string;
};
