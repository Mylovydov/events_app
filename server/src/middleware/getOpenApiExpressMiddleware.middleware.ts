import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import { appRouter } from '../routes/index.js';
import { createContext } from '../trpc/index.js';

const getOpenApiExpressMiddleware = () => {
	return createOpenApiExpressMiddleware({
		router: appRouter,
		createContext,
		responseMeta: undefined,
		onError: undefined,
		maxBodySize: undefined
	});
};

export default getOpenApiExpressMiddleware;
