import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TAppRouter } from '../../../server/src/types/shared.types';

const trpcClient = createTRPCProxyClient<TAppRouter>({
	links: [
		loggerLink(),
		httpBatchLink({
			url: `${import.meta.env.VITE_SERVER_URL}/api/trpc`
		})
	]
});

export default trpcClient;
