import { Request } from 'express';
import { refreshTokenKeyName } from '../constants';

const getRefreshTokenFromCookie = (req: Request) =>
	req.cookies[refreshTokenKeyName];

export default getRefreshTokenFromCookie;
