import { accessTokenName } from '@/utils';

const getTokenFromLS = () => {
	if (window.localStorage !== undefined) {
		return localStorage.getItem(accessTokenName);
	}
	return null;
};
export default getTokenFromLS;
