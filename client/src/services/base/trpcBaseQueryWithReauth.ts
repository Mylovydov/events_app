import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { trpcClient, TTRPCClientError } from '@/trpc';
import { isTErrorResponse } from '@/utils';
import { clearAppUser } from '@/slices';
import { trpcBaseQuery, TSuccessResponse } from '@/services';
import { Resolver } from '@trpc/client';
import { GetUserQueryType } from '@/trpc/trpc.ts';

const trpcBaseQueryWithReauth: BaseQueryFn<
	Promise<{
		// pendingPromise: Promise<TSuccessResponse>;
		originalRequest: Resolver<GetUserQueryType>;
		requestArgs: unknown;
	}>,
	TSuccessResponse,
	TTRPCClientError
> = async (args, api, extraOptions) => {
	const { originalRequest, requestArgs } = await args;

	let result = await trpcBaseQuery(
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		originalRequest(requestArgs),
		api,
		extraOptions
	);
	console.log('api======', api);
	console.log('result======', result);
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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
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

// const trpcBaseQueryWithReauth: BaseQueryFn<
// 	Promise<{
// 		requestPromise: Promise<TSuccessResponse>;
// 		request: Resolver<GetUserQueryType>;
// 	}>,
// 	// Promise<TSuccessResponse>,
// 	TSuccessResponse,
// 	TTRPCClientError
// > = async (args, api, extraOptions) => {
// 	let result = await trpcBaseQuery(args, api, extraOptions);
//
// 	if (
// 		result.error &&
// 		isTErrorResponse(result.error) &&
// 		result.error.status === 401
// 	) {
// 		const { data } = await trpcBaseQuery(
// 			trpcClient.auth.refresh.query(),
// 			api,
// 			extraOptions
// 		);
// 		if (data) {
// 			result = await trpcBaseQuery(args, api, extraOptions);
// 		} else {
// 			api.dispatch(clearAppUser());
// 		}
// 	}
// 	return result;
// };
//
// export default trpcBaseQueryWithReauth;
