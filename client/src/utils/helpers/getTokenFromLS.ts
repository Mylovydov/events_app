import { accessTokenName } from '@/utils';

const getTokenFromLS = () => {
	if (window.localStorage !== undefined) {
		return localStorage.getItem(accessTokenName);
	}
};
export default getTokenFromLS;
