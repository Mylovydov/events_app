import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TAppRouter } from '../../../server/src/types/shared.types';
import { localStorageService } from '@/utils';

const isDevMode = process.env.NODE_ENV === 'development';

export type GetUserQueryType = TAppRouter['users']['getUser'];

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

const trpcClient = createTRPCProxyClient<TAppRouter>({ links });

export default trpcClient;
