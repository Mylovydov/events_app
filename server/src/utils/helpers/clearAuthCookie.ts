import { refreshTokenKeyName } from '../constants';
import { Response } from 'express';

const clearAuthCookie = (res: Response) => res.clearCookie(refreshTokenKeyName);

export default clearAuthCookie;
