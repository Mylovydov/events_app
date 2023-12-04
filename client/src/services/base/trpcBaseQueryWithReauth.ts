import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { trpcBaseQuery, TSuccessResponse } from '@/services';
import { trpcClient, TTRPCClientError } from '@/trpc';
import { isTErrorResponse } from '@/utils';
import { clearAppUser } from '@/slices';

const trpcBaseQueryWithReauth: BaseQueryFn<
	// string | FetchArgs,
	Promise<TSuccessResponse>,
	TSuccessResponse,
	TTRPCClientError
> = async (args, api, extraOptions) => {
	console.log('args before', args);
	console.log('api', api);

	let result = await trpcBaseQuery(args, api, extraOptions);
	console.log('args after', args);
	if (
		result.error &&
		isTErrorResponse(result.error) &&
		result.error.status === 401
	) {
		const { error, data } = await trpcBaseQuery(
			trpcClient.auth.refresh.query(),
			api,
			extraOptions
		);
		console.log('isTErrorResponse=======END', data);
		console.log('error========', error);
		if (data) {
			console.log('refreshDataExist=======START', args);
			result = await trpcBaseQuery(args, api, extraOptions);
			console.log('refreshDataExist=======END', result);
		} else {
			api.dispatch(clearAppUser());
		}
	}
	return result;
};

export default trpcBaseQueryWithReauth;
