import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { TSuccessResponse } from '@/services';
import { TTRPCClientError } from '@/trpc';
import { isAuthResponseData, localStorageService } from '@/utils';

const trpcBaseQuery: BaseQueryFn<
	Promise<TSuccessResponse>,
	TSuccessResponse,
	TTRPCClientError
> = async (trpcResult, api) => {
	console.log('api.endpoint======success', api);
	return trpcResult
		.then(result => {
			if (isAuthResponseData(result.data)) {
				localStorageService.setTokenToLS(result.data.accessToken);
			}

			// if (isAuthEndpoint(api.endpoint) && isAuthResponseData(result.data)) {
			// 	console.log('api.endpoint======success', api.endpoint);
			// 	localStorageService.setTokenToLS(result.data.accessToken);
			// }
			return { data: result };
		})
		.catch(error => ({ error: error.data }));
};

export default trpcBaseQuery;
