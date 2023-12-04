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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDBiMGUwYS0wZjIzLTRhMzUtOGQwYS1lM2RmOGNhOTdlNTQiLCJpYXQiOjE3MDE3MTU5NzgsImV4cCI6MTcwMTcxNTk4OH0.0VCLu2m1o2CZIf8-1LaY5dgC9XNb2ETkdbvR2OpwGdM

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDBiMGUwYS0wZjIzLTRhMzUtOGQwYS1lM2RmOGNhOTdlNTQiLCJpYXQiOjE3MDE3MTU5NzgsImV4cCI6MTcwMTc1MTk3OH0.GEHzBzejsySba7KEjxSQmFISuY3Igb6LW_zVsQselUE
