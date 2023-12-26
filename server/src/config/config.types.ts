export type TConfig = {
	API_PORT: string;
	CLIENT_URL: string;

	MONGO_DB_URL: string;
	BASE_APP_USER_EMAIL: string;
	BASE_APP_USER_PASSWORD: string;

	ACCESS_JWT_SECRET: string;
	REFRESH_JWT_SECRET: string;
	ACCESS_JWT_EXPIRES_IN: string;
	REFRESH_JWT_EXPIRES_IN: string;

	get(key: keyof TConfig): string;
};
