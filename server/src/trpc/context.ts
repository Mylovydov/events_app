import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';

const createContext = async ({ req, res }: CreateExpressContextOptions) => {
	let user = null;
	const header = req.headers['authorization'];

	try {
		if (header) {
			// const token = header.split(' ')[1];
			const userId = 1; // TODO: need verify token
			if (userId) {
				// TODO: find user by id in db and user = founded user
				user = userId;
			}
		}
	} catch (err) {
		console.log(`createContext error: ${err}`);
	}

	return {
		user,
		req,
		res
	};
};

export type TContext = inferAsyncReturnType<typeof createContext>;

export default createContext;
