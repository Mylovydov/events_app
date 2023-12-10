import { refreshTokenKeyName } from '../constants.js';
import { Response } from 'express';

const clearAuthCookie = (res: Response) => res.clearCookie(refreshTokenKeyName);

export default clearAuthCookie;
