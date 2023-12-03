import { Request } from 'express';
import { refreshTokenKeyName } from '../constants.js';

const getRefreshTokenFromCookie = (req: Request) =>
	req.cookies[refreshTokenKeyName];

export default getRefreshTokenFromCookie;
