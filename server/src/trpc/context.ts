import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import { tokenService } from '../modules/token/index.js';
import { getTokenFromHeader } from '../utils/helpers/index.js';

const createContext = ({ req, res }: CreateExpressContextOptions) => {
	const token = getTokenFromHeader(req.headers);
	const userId = tokenService.verifyAccessToken(token || '');

	return {
		userId,
		req,
		res
	};
};

export type TContext = inferAsyncReturnType<typeof createContext>;

export default createContext;
