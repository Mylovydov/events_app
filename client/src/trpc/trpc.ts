import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TAppRouter } from '../../../server/src';
import { localStorageService } from '@/utils';

const isDevMode = process.env.NODE_ENV === 'development';

const getTRPCOpt = () => {
	const links = [
		httpBatchLink({
			url: import.meta.env.VITE_SERVER_URL,
			fetch: (url, opt) => fetch(url, { ...opt, credentials: 'include' }),
			headers: () => {
				const token = localStorageService.getTokenFromLS();
				return token ? { Authorization: `Bearer ${token}` } : {};
			}
		})
	];

	if (isDevMode) {
		links.unshift(loggerLink());
	}

	return { links };
};

const trpcClient = createTRPCProxyClient<TAppRouter>(getTRPCOpt());

export default trpcClient;
