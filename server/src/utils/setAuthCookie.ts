import { Response } from 'express';
import { CookieOptions } from 'express-serve-static-core';
import { refreshTokenKeyName } from './constants.js';

const setAuthCookie = (
	res: Response,
	value: string,
	opt: CookieOptions = {}
) => {
	res.cookie(refreshTokenKeyName, value, {
		httpOnly: true,
		maxAge: 60 * 60 * 1000,
		...opt
	});
};

export default setAuthCookie;
