import { jwtDecode } from 'jwt-decode';

const decodeUserToken = (token: string | null) => {
	if (token) {
		const decodedToken = jwtDecode<{ userId: string }>(token);
		return decodedToken.userId;
	}
	return null;
};

export default decodeUserToken;
