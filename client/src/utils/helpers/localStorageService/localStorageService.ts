import { accessTokenName, TLocalStorageService } from '@/utils';

const localStorageService: TLocalStorageService = {
	tokenName: accessTokenName,
	setTokenToLS(token: string, name?: string) {
		if (window?.localStorage !== undefined) {
			localStorage.setItem(name ?? this.tokenName, token);
		}
	},
	getTokenFromLS(name?: string) {
		if (window?.localStorage !== undefined) {
			return localStorage.getItem(name ?? this.tokenName);
		}
		return null;
	},
	removeToken(name?: string) {
		if (window?.localStorage !== undefined) {
			localStorage.removeItem(name ?? this.tokenName);
		}
	}
};

export default localStorageService;
