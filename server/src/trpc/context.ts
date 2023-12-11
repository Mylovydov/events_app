import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import { tokenService } from '../modules/token';
import { getTokenFromHeader } from '../utils/helpers';

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
