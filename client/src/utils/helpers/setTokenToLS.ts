import { accessTokenName } from '@/utils';

const setTokenToLS = (token?: string) => {
	if (token && window.localStorage !== undefined) {
		localStorage.setItem(accessTokenName, token);
	}
};

export default setTokenToLS;
