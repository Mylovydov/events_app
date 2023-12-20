import { TBaseQueryArgs, TSuccessResponse } from '@/services';
import { TTRPCClientError } from '@/trpc';
import { isAuthResponseData, localStorageService } from '@/utils';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

const trpcBaseQuery: BaseQueryFn<
	TBaseQueryArgs,
	TSuccessResponse,
	TTRPCClientError
> = async trpcResult => {
	return trpcResult
		.then(result => {
			if (isAuthResponseData(result.data)) {
				localStorageService.setTokenToLS(result.data.accessToken);
			}
			return { data: result };
		})
		.catch(error => ({ error: error.data }));
};

export default trpcBaseQuery;
