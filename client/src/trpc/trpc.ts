import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TAppRouter } from '../../../server/src/types/shared.types';
import { getTokenFromLS } from '@/utils';

const isDevMode = process.env.NODE_ENV === 'development';

const links = [
	httpBatchLink({
		url: `${import.meta.env.VITE_SERVER_URL}/api/trpc`,
		fetch: (url, opt) => fetch(url, { ...opt, credentials: 'include' }),
		headers: () => {
			const token = getTokenFromLS();
			return token ? { Authorization: `Bearer ${token}` } : {};
		}
	})
];

if (isDevMode) {
	links.unshift(loggerLink());
}

const trpcClient = createTRPCProxyClient<TAppRouter>({ links });

export default trpcClient;
