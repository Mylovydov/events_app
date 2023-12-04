import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { TSuccessResponse } from '@/services';
import { TTRPCClientError } from '@/trpc';
import {
	isAuthEndpoint,
	isAuthResponseData,
	localStorageService
} from '@/utils';

const trpcBaseQuery: BaseQueryFn<
	Promise<TSuccessResponse>,
	TSuccessResponse,
	TTRPCClientError
> = async (trpcResult, api) => {
	return trpcResult
		.then(result => {
			if (isAuthEndpoint(api.endpoint) && isAuthResponseData(result.data)) {
				localStorageService.setTokenToLS(result.data.accessToken);
			}
			return { data: result };
		})
		.catch(error => ({ error: error.data }));
};

export default trpcBaseQuery;
