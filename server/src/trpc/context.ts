import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import { tokenService } from '../modules/token/index.js';

const createContext = ({ req, res }: CreateExpressContextOptions) => {
	let userId = null;

	const header = req.headers['authorization'];
	if (header) {
		const token = header.split(' ')[1];
		userId = tokenService.verifyAccessToken(token);
	}

	return {
		userId,
		req,
		res
	};
};

export type TContext = inferAsyncReturnType<typeof createContext>;

export default createContext;
