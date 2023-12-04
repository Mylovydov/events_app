import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { EApiTags, isTErrorResponse, localStorageService } from '@/utils';
import { trpcClient, TTRPCClientError } from '@/trpc';
import { TAuthOutput, TSuccessResponse } from '@/services';
import { TRPCClientError } from '@trpc/client';
import { clearAppUser } from '@/slices';

export const isTRPCClientError = (
	cause: unknown
): cause is TTRPCClientError => {
	return cause instanceof TRPCClientError;
};

const isAuthData = (data: unknown): data is TAuthOutput => {
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
			if (isAuthEndpoint(api.endpoint) && isAuthData(result.data)) {
				localStorageService.setTokenToLS(result.data.accessToken);
			}
			return { data: result };
		})
		.catch(error => ({ error: error.data }));
};

const trpcBaseQueryWithReauth: BaseQueryFn<
	Promise<TSuccessResponse>,
	TSuccessResponse,
	TTRPCClientError
> = async (args, api, extraOptions) => {
	let result = await trpcBaseQuery(args, api, extraOptions);

	if (
		result.error &&
		isTErrorResponse(result.error) &&
		result.error.status === 401
	) {
		const { error } = await trpcBaseQuery(
			trpcClient.auth.refresh.query(),
			api,
			extraOptions
		);

		if (error) {
			api.dispatch(clearAppUser());
			return result;
		}

		result = await trpcBaseQuery(args, api, extraOptions);
	}
	return result;
};

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: trpcBaseQueryWithReauth,
	tagTypes: [EApiTags.EVENTS, EApiTags.USERS, EApiTags.EMAIL_SETTINGS],
	endpoints: () => ({})
});

export default baseApi;
