import { IncomingHttpHeaders } from 'http';

const getTokenFromHeader = (headers: IncomingHttpHeaders) => {
	if (headers.authorization && headers.authorization.startsWith('Bearer ')) {
		return headers.authorization.split(' ')[1];
	}
	return null;
};

export default getTokenFromHeader;
