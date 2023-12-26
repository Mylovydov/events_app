import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import { appRouter } from '../routes';
import { createContext } from '../trpc';

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
