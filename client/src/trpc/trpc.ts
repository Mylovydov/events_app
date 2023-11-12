import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TAppRouter } from '../../../server/src/types/shared.types';

const trpcClient = createTRPCProxyClient<TAppRouter>({
	links: [
		loggerLink(),
		httpBatchLink({
			url: 'http://localhost:4200/api/trpc'
		})
	]
});

export default trpcClient;
