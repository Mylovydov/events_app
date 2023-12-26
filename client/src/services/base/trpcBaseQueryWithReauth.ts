import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { trpcClient, TTRPCClientError } from '@/trpc';
import { isTErrorResponse } from '@/utils';
import { clearAppUser } from '@/slices';
import {
	TBaseQueryWithReauthPromiseArgs,
	trpcBaseQuery,
	TSuccessResponse
} from '@/services';

const trpcBaseQueryWithReauth: BaseQueryFn<
	TBaseQueryWithReauthPromiseArgs,
	TSuccessResponse,
	TTRPCClientError
> = async (args, api, extraOptions) => {
	const { originalRequest, requestArgs } = await args;
	let result = await trpcBaseQuery(
		originalRequest(requestArgs),
		api,
		extraOptions
	);

	// INFO: добавляем api, только потому что этого требует trpcBaseQuery. В целом это бессмысленно
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
			result = await trpcBaseQuery(
				originalRequest(requestArgs),
				api,
				extraOptions
			);
		} else {
			api.dispatch(clearAppUser());
		}
	}
	return result;
};

export default trpcBaseQueryWithReauth;
