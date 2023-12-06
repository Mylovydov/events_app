export type TLocalStorageService = {
	tokenName: string;
	setTokenToLS(token?: string): void;
	getTokenFromLS(name?: string): string | null;
	removeToken(name?: string): void;
};
