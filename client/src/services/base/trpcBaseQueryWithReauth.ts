import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { trpcClient, TTRPCClientError } from '@/trpc';
import { isTErrorResponse } from '@/utils';
import { clearAppUser } from '@/slices';
import { trpcBaseQuery, TSuccessResponse } from '@/services';

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
		const { data } = await trpcBaseQuery(
			trpcClient.auth.refresh.query(),
			api,
			extraOptions
		);
		if (data) {
			result = await trpcBaseQuery(args, api, extraOptions);
		} else {
			api.dispatch(clearAppUser());
		}
	}
	return result;
};

export default trpcBaseQueryWithReauth;
