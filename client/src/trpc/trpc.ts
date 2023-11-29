import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TAppRouter } from '../../../server/src/types/shared.types';

const isDevMode = process.env.NODE_ENV === 'development';

const links = [
	httpBatchLink({
		url: `${import.meta.env.VITE_SERVER_URL}/api/trpc`
	})
];

if (isDevMode) {
	links.unshift(loggerLink());
}

const trpcClient = createTRPCProxyClient<TAppRouter>({
	links
});

export default trpcClient;
