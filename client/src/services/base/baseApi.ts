import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { EApiTags, setTokenToLS } from '@/utils';
import { TTRPCClientError } from '@/trpc';
import { TAuthOutput, TSuccessResponse } from '@/services';

const isLoginData = (data: unknown): data is TAuthOutput => {
	return (
		typeof data === 'object' &&
		data !== null &&
		'accessToken' in data &&
		'refreshToken' in data
	);
};

const isAuthEndpoint = (endpoint: string) => {
	return (
		endpoint === 'login' || endpoint === 'register' || endpoint === 'refresh'
	);
};

const trpcBaseQuery: BaseQueryFn<
	Promise<TSuccessResponse>,
	TSuccessResponse,
	TTRPCClientError
> = async (trpcResult, api) => {
	return trpcResult
		.then(result => {
			if (isAuthEndpoint(api.endpoint) && isLoginData(result.data)) {
				setTokenToLS(result.data.accessToken);
			}
			return { data: result };
		})
		.catch(error => ({ error: error.data }));
};

// const trpcBaseQueryWithReauth: BaseQueryFn<
// 	Promise<TSuccessResponse>,
// 	TSuccessResponse,
// 	TTRPCClientError
// > = async (args, api, extraOptions) => {
// 	let result = await trpcBaseQuery(args, api, extraOptions)
// 	if (result.error && result.status === 401) {
// 		// try to get a new token
// 		const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
// 		if (refreshResult.data) {
// 			// store the new token
// 			api.dispatch(tokenReceived(refreshResult.data))
// 			// retry the initial query
// 			result = await baseQuery(args, api, extraOptions)
// 		} else {
// 			api.dispatch(loggedOut())
// 		}
// 	}
// 	return result
// }

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: trpcBaseQuery,
	tagTypes: [EApiTags.EVENTS, EApiTags.USERS, EApiTags.EMAIL_SETTINGS],
	endpoints: () => ({})
});

export default baseApi;
