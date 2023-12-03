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
	get(key: keyof TConfig): string;
};
