import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { trpcBaseQuery, TSuccessResponse } from '@/services';
import { trpcClient, TTRPCClientError } from '@/trpc';
import { isTErrorResponse } from '@/utils';
import { clearAppUser } from '@/slices';

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

export default trpcBaseQueryWithReauth;
